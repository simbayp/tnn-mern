const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function requireAuth(req, res, next) {
  // verify authentication
  const { authorization } = req.headers;

  // checking whether we have an authorization value in the incoming request
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  // extracting the token which is in the form 'Bearer ekfloihyrhlk.eijgjhjophpzfzh.eielglhkrirHg'
  const token = authorization.split(' ').at(1);

  // verifying that the token is not tampered
  try {
    const { _id } = jwt.verify(token, process.env.SECRET); // this will return the payload (2nd part) of the JWT

    // attach a 'user' property on the incoming request before executing the workout controller functions
    req.user = await User.findOne({ _id }).select('_id');
    next();
  } catch (error) {
    res.status(401).json({ error: 'Request is not authorized' });
  }
}

module.exports = requireAuth;
