const { Router } = require("express");
const { editUsuarios } = require("../handlers/editUserHandle.js");

const router = Router();

router.post("/", (req, res) => {
  return res.status(200).send("aca pasa");
});

module.exports = router;
