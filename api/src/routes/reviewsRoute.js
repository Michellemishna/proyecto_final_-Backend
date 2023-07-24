const { Router } = require("express");
const {postReview, getReview } = require("../handlers/getReviews");

const router = Router();

router.get("/:id", getReview);
router.post("/", postReview);



module.exports = router;