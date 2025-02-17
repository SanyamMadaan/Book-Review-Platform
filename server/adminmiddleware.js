const { model } = require('mongoose');
const { Admin } = require('./model');
const jwt=require('jsonwebtoken');

async function adminmiddleware(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(400).json({ message: "Invalid Authentication " });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(400).json({ message: "Invalid Authentication" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports=adminmiddleware;
