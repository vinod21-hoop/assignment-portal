const User = require('../models/User');
const Assignment = require('../models/Assignment');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = new User({ username, password, isAdmin: true });
    await admin.save();
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    res.status(201).send({ admin, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await User.findOne({ username, isAdmin: true });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    res.send({ admin, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ admin: req.user._id })
      .populate('userId', 'username')
      .select('userId task createdAt status');
    res.send(assignments);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.acceptAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.params.id, admin: req.user._id },
      { status: 'accepted' },
      { new: true }
    );
    if (!assignment) {
      return res.status(404).send({ error: 'Assignment not found' });
    }
    res.send(assignment);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.rejectAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.params.id, admin: req.user._id },
      { status: 'rejected' },
      { new: true }
    );
    if (!assignment) {
      return res.status(404).send({ error: 'Assignment not found' });
    }
    res.send(assignment);
  } catch (error) {
    res.status(400).send(error);
  }
};