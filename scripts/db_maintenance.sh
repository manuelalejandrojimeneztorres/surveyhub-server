#!/bin/bash
# SurveyHub Database Maintenance Script
# Author: Manuel Alejandro Jiménez Torres
# Version: 1.0

# Configuration
DB_USER="your_username"
DB_PASSWORD="your_password"
DB_NAME="surveyhub"
RETENTION_DAYS=180  # Retain data for 6 months
BACKUP_DIR="/var/backups/surveyhub"
REPORT_DIR="/var/reports/surveyhub"
LOG_FILE="$REPORT_DIR/maintenance_$(date +%Y%m%d).log"

# Security configuration
set -eo pipefail
umask 077

# Create directories if they do not exist
mkdir -p "$BACKUP_DIR" "$REPORT_DIR"

# Logging function
log() {
    local level=$1
    local message=$2
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$level] $message" | tee -a "$LOG_FILE"
}

# Function to execute SQL queries
execute_sql() {
    local query=$1
    mysql --user="$DB_USER" --password="$DB_PASSWORD" --database="$DB_NAME" --execute="$query"
}

# Process start
log "INFO" "Starting database maintenance"

# 1. Emergency backup (structure only)
log "INFO" "Creating structural backup"
mysqldump --user="$DB_USER" --password="$DB_PASSWORD" \
    --no-data --single-transaction --routines \
    "$DB_NAME" > "$BACKUP_DIR/${DB_NAME}_structure_$(date +%Y%m%d%H%M%S).sql"

# 2. Deleting outdated records
log "INFO" "Initiating data cleanup (older than $RETENTION_DAYS days)"

# Delete old responses
RESPONSE_DELETED=$(execute_sql "DELETE FROM response 
    WHERE endDate < NOW() - INTERVAL $RETENTION_DAYS DAY" | awk '{print $2}')

# Delete expired surveys
SURVEY_DELETED=$(execute_sql "DELETE FROM survey 
    WHERE endDate IS NOT NULL 
    AND endDate < NOW() - INTERVAL $RETENTION_DAYS DAY" | awk '{print $2}')

log "INFO" "Deleted records - Surveys: $SURVEY_DELETED, Responses: $RESPONSE_DELETED"

# 3. Table optimization
log "INFO" "Starting table optimization"
TABLES=$(execute_sql "SHOW TABLES" -sN)

for table in $TABLES; do
    log "INFO" "Optimizing table: $table"
    execute_sql "OPTIMIZE TABLE $table" > /dev/null
done

# 4. Audit report generation
log "INFO" "Generating audit reports"
REPORT_FILE="$REPORT_DIR/audit_$(date +%Y%m%d%H%M%S).csv"

# Report header
echo "Table,Records,Size,Free space,Last update" > "$REPORT_FILE"

# Report data
execute_sql "SELECT TABLE_NAME AS Table, 
    TABLE_ROWS AS Records, 
    ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2) AS 'Size (MB)', 
    ROUND(DATA_FREE / 1024 / 1024, 2) AS 'Free space (MB)', 
    UPDATE_TIME AS 'Last update'
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_SCHEMA = '$DB_NAME'" -s | sed 's/\t/,/g' >> "$REPORT_FILE"

# Activity summary
echo -e "\nActivity Summary:" >> "$REPORT_FILE"
echo "Deleted surveys,$SURVEY_DELETED" >> "$REPORT_FILE"
echo "Deleted responses,$RESPONSE_DELETED" >> "$REPORT_FILE"

# 5. Final cleanup
log "INFO" "Cleaning up orphaned answers"
execute_sql "DELETE a FROM answer a 
    LEFT JOIN response r ON a.responseId = r.id 
    WHERE r.id IS NULL" > /dev/null

# Completion
log "INFO" "Maintenance successfully completed"
echo -e "\nFull log available at: $LOG_FILE"
echo "Detailed report generated at: $REPORT_FILE"
