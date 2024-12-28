// Generate token using secret from process.env.JWT_SECRET
const jwt = require('jsonwebtoken');

// Generate token and return it
function generateAccessToken(systemUser) {
    // 1. Don't use password and other sensitive fields
    // 2. Use the information that are useful in other parts
    if (!systemUser) return null;

    var user = {
        id: systemUser.id,
        loginName: systemUser.loginName,
        emailAddress: systemUser.emailAddress,
        phoneNumber: systemUser.phoneNumber,
        passwordHash: systemUser.passwordHash,
        tokenVersion: systemUser.tokenVersion
    };

    // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // Expires in 24 hours
    });
}

// Extract and return essential user details
function extractBasicUserDetails(systemUser) {
    if (!systemUser) return null;

    return {
        id: systemUser.id,
        loginName: systemUser.loginName,
        emailAddress: systemUser.emailAddress,
        phoneNumber: systemUser.phoneNumber,
        passwordHash: systemUser.passwordHash,
        tokenVersion: systemUser.tokenVersion
    };
}

module.exports = {
    generateAccessToken,
    extractBasicUserDetails
}
