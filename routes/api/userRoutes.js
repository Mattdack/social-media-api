const router = require(`express`).Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require (`../../controllers/userController`);

router.route(`/`).get(getUsers).post(createUser);

router.route(`/:id`).get(getSingleUser).post(updateUser).delete(deleteUser);

module.exports = router;