const { User, Thought } = require(`../models`);

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select(`-__v`)
      .populate(`thoughts`)
      .populate(`friends`)
      .then((user) =>
        !user
          ? res.status(404).json({ message: `No user with that ID` })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.status(200).json(userData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: `No user with this id!` })
          : res.status(200).json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: `No user with this id!` })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.status(200).json({
          message: `User and associated thoughts and reactions deleted!`,
        })
      )
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: `No user with this id!` })
          : res.status(200).json(user)
      ).catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: `No user with this id to remove friend from!` })
          : res.status(200).json({ message: `Friend removed! ` })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
