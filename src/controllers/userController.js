const User = require('../models/User');
const Assignment = require('../models/Assignment');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.uploadAssignment = async (req, res) => {
  try {
    const { task, admin } = req.body;
    const assignment = new Assignment({
      userId: req.user._id,
      task,
      admin,
    });
    await assignment.save();
    res.status(201).send(assignment);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ isAdmin: true }, 'username');
    res.send(admins);
  } catch (error) {
    res.status(500).send(error);
  }
};