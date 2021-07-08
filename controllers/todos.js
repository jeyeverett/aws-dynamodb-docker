const uuidv4 = require("uuid").v4;
const mapper = require("../db/dynamo-client");
const Todo = require("../models/todo");

module.exports.home = (req, res) => {
  return res.send("Hello, world!");
};

module.exports.getToDos = async (req, res) => {
  const { showpending: showPending } = req.query;
  const result = [];
  try {
    for await (const todo of mapper.scan(Todo)) {
      if (showPending) {
        if (todo.complete === false) {
          result.push(todo);
        }
      } else {
        result.push(todo);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "DynamoDB error" });
  }
  return res.status(200).json({ result });
};

module.exports.putToDos = async (req, res) => {
  const { uuid } = req.params;

  try {
    const todo = await mapper.get(Object.assign(new Todo(), { uuid }));
    await mapper.update(todo);
    return res.status(200).json({ todo });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.name);
  }
};

module.exports.postToDos = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send("Please enter a name");
  }

  const todo = new Todo();
  todo.uuid = uuidv4();
  todo.name = req.body.name;
  todo.complete = false;

  mapper
    .put({ item: todo })
    .then((data) => {
      console.log(data);
      return res.status(200).json({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "DynamoDB error" });
    });
};
