USE surveyhub;

INSERT INTO surveyhub.surveystatus (status, createdAt) VALUES
('Planned', NOW()),
('Open', NOW()),
('Closed', NOW()),
('Suspended', NOW());

INSERT INTO surveyhub.questiontype (type, createdAt) VALUES
('Open', NOW()),
('Dropdown', NOW()),
('Multiple Choice', NOW()),
('Logical', NOW());

INSERT INTO surveyhub.role (name, description, createdAt) VALUES
('System Administrator', 'Complete access to all resources, configurations, and system settings.', NOW()),
('Survey Manager', 'Authorized to create, modify, and delete surveys, as well as manage related resources.', NOW()),
('Respondent', 'Limited to viewing and responding to assigned surveys.', NOW());

INSERT INTO surveyhub.systemuser (loginName, firstName, lastName, emailAddress, phoneNumber, passwordHash, status, tokenVersion, createdAt) VALUES
('admin', 'Manuel Alejandro', 'Jiménez Torres', 'admin@surveyhub.com', '+34928123456', '$2y$12$/IVtHtsOqv9AxqjEUXLdcuci4SctmDZRbdHRJqgPRaE3h43EBN04i', 'Active', 1, NOW());

INSERT INTO surveyhub.systemuserrole (createdAt, roleId, systemUserId) VALUES
(NOW(), 1, 1);
