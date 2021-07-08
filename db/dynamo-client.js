const AWS = require("aws-sdk");
const { DataMapper } = require("@aws/dynamodb-data-mapper");

const config = {};

if (process.env.NODE_ENV === "development") {
  config.region = "us-east-1";
  config.endpoint = "http://localhost:8000";
  config.accessKey = "FOOBAR";
  config.secretAccessKey = "FOOBAR";
} else {
  config.region = "us-east-1";
  config.accessKey = "";
  config.secretAccessKey = "";
}

const client = new AWS.DynamoDB(config);
const mapper = new DataMapper({ client });

module.exports = mapper;
