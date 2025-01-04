const db = require('../models');
const SystemUser = db.systemuser;
const Op = db.Sequelize.Op;
const { getSystemUserRoles } = require('../utils/systemuser.utils');

async function validateTokenVersion(req, res, next) {
    try {
        const { id, tokenVersion } = req.user;
        const user = await SystemUser.findByPk(id);

        if (!user || user.tokenVersion !== tokenVersion) {
            return res.status(401).json({
                error: true,
                message: 'Invalid or outdated token'
            });
        }

        next();
    } catch (error) {
        console.error('Error validating token version:', error);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
}

function authorizeRoles(requiredRoles) {
    return async (req, res, next) => {
        try {
            const { id } = req.user;
            const systemUserRoles = await getSystemUserRoles(id);

            const hasRequiredRole = requiredRoles.some((role) => systemUserRoles.includes(role));
            if (!hasRequiredRole) {
                return res.status(403).json({
                    error: true,
                    message: 'Access denied: insufficient permissions'
                });
            }

            next();
        } catch (error) {
            console.error('Error authorizing roles:', error);
            return res.status(500).json({ error: true, message: 'Internal Server Error' });
        }
    };
}

module.exports = { validateTokenVersion, authorizeRoles };
