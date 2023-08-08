const { Router } = require("express");
const {postReview, getReview, deleteReview } = require("../handlers/getReviews");

const router = Router();

router.get("/:id", getReview);
router.post("/", postReview);
router.delete("/:id", deleteReview);



module.exports = router;