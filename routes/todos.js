const express = require("express");
const router = express.Router();

const { home, getToDos, putToDos, postToDos } = require("../controllers/todos");

router.route("/").get(home);

router.route("/todos").get(getToDos).put(putToDos).post(postToDos);

module.exports = router;
