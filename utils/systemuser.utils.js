const db = require('../models');
const SystemUser = db.systemuser;
const Role = db.role;
const SystemUserRole = db.systemuserrole;
const Op = db.Sequelize.Op;

async function getSystemUserRoles(systemUserId) {
    try {
        const systemUserWithRoles = await SystemUser.findOne({
            where: { id: systemUserId },
            include: [
                {
                    model: Role,
                    through: { attributes: [] },
                }
            ]
        });

        if (!systemUserWithRoles) {
            throw new Error('SystemUser not found');
        }

        return systemUserWithRoles.roles.map((roleInstance) => roleInstance.name);
    } catch (error) {
        console.error('Error fetching SystemUser roles:', error);
        throw error;
    }
}

module.exports = { getSystemUserRoles };
