const express = require("express");
const router = express.Router();

const { home, getToDos, putToDos, postToDos } = require("../controllers/todos");

router.route("/").get(home);

router.route("/todos").get(getToDos).post(postToDos);

router.route("/todos/:uuid").put(putToDos);

module.exports = router;
