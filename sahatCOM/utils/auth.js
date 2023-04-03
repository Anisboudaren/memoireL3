const ROLES = {
  ADMIN: 'Admin',
  CG: 'Caregiver',
  PATIENT: 'Patient',
};

function authRole(role) {
  return (req, res, next) => {
    console.log(req.user.usertype);
    if (req.user.usertype !== role) {
      if (req.user.usertype !== ROLES.ADMIN)
        res.status(401).json({
          message: 'not allowed !!',
        });
    }
    next();
  };
}

module.exports = {
  authRole,
  ROLES,
};
