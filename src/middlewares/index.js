const checkUserRole = (requiredRoles) => {
    return (req, res, next) => {
        const userRoles = req.user ? req.user.roles : [];
        const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
        if (hasRequiredRole) {
            next();
        } else {
            res.status(403).json({ status: 'error', message: "You do not have access" });
        }
    };
};

module.exports = { checkUserRole };

