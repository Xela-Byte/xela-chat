const bcrypt = require('bcryptjs');

const User = require('../models/userModel');

module.exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const userNameCheck = await User.findOne({ userName });
    const emailCheck = await User.findOne({ email });

    if (userNameCheck) {
      return res.json({ msg: 'UserName Already Exists!', status: false });
    }
    if (emailCheck) {
      return res.json({
        msg: 'Email Associated With Another Account!',
        status: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.json({
        msg: 'Incorrect UserName Or Password!',
        status: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        msg: 'Incorrect UserName Or Password!',
        status: false,
      });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      'email',
      'userName',
      'avatarImage',
      ' _id',
    ]);

    return res.json(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
