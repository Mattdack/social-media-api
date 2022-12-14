const router = require(`express`).Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require(`../../controllers/thoughtController`);

router.route(`/`).get(getThoughts).post(createThought);

router.route(`/:id`).get(getSingleThought).put(updateThought).delete(deleteThought);

router.route(`/:id/reaction/`).post(addReaction);

router.route(`/:id/reaction/:reactionId`).delete(removeReaction);

module.exports = router;