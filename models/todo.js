const { DynamoDbSchema, DynamoDbTable } = require("@aws/dynamodb-data-mapper");

class Todo {}

Object.defineProperties(Todo.prototype, {
  [DynamoDbTable]: {
    value: "todos",
  },
  [DynamoDbSchema]: {
    value: {
      uuid: {
        type: "String",
        keyType: "HASH",
      },
      name: { type: "String" },
      complete: { type: "Boolean" },
    },
  },
});

module.exports = Todo;
