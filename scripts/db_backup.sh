#!/bin/bash
# Full Backup Script for SurveyHub Database
# Author: Manuel Alejandro Jiménez Torres
# Version: 1.0

# Configuration
DB_HOST="localhost"
DB_PORT="3306"
DB_USER="your_user"
DB_PASSWORD="your_password"
DB_NAME="surveyhub"
BACKUP_ROOT="/var/backups/surveyhub"
RETENTION_DAYS=30
TIMESTAMP=$(date +%Y%m%d%H%M%S)
BACKUP_DIR="$BACKUP_ROOT/$TIMESTAMP"
ENCRYPTION_KEY="/path/to/encryption.key"

# Security settings
set -eo pipefail
umask 077

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Full backup
full_backup() {
    log "Starting full backup"
    
    # Binary backup for InnoDB tables
    mariabackup --backup \
        --host="$DB_HOST" \
        --port="$DB_PORT" \
        --user="$DB_USER" \
        --password="$DB_PASSWORD" \
        --target-dir="$BACKUP_DIR" \
        --compress \
        --compress-threads=4
    
    log "Binary backup completed: $BACKUP_DIR"
}

# Logical backup
logical_backup() {
    log "Starting logical backup"
    
    # Full export using mysqldump
    mysqldump --user="$DB_USER" --password="$DB_PASSWORD" \
        --host="$DB_HOST" \
        --port="$DB_PORT" \
        --single-transaction \
        --routines \
        --triggers \
        --events \
        --hex-blob \
        --master-data=2 \
        "$DB_NAME" | openssl enc -aes-256-cbc -salt -pass file:"$ENCRYPTION_KEY" -out "$BACKUP_DIR/full_dump.sql.enc"
    
    log "Encrypted logical backup generated: $BACKUP_DIR/full_dump.sql.enc"
}

# Backup rotation
rotate_backups() {
    log "Executing backup rotation (older than $RETENTION_DAYS days)"
    find "$BACKUP_ROOT" -type d -mtime +$RETENTION_DAYS -exec rm -rf {} \;
}

# Main execution
main() {
    log "=== BACKUP PROCESS STARTED ==="
    full_backup
    logical_backup
    rotate_backups
    log "=== BACKUP COMPLETED SUCCESSFULLY ==="
}

main
