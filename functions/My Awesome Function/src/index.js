const sdk = require("node-appwrite");

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - object with request body data
    'env' - object with environment variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  client
    .setEndpoint(req.env["APPWRITE_FUNCTION_ENDPOINT"])
    .setProject(req.env["APPWRITE_FUNCTION_PROJECT_ID"])
    .setKey(req.env["API_KEY"])
    .setSelfSigned(true);

  let database = new sdk.Database(client);

  const payload = JSON.parse(req.env["APPWRITE_FUNCTION_EVENT_DATA"]);
  const { $id, $collection } = payload;

  const data = await database.updateDocument($collection, $id, {
    createdAt: Date.now(),
  });

  res.json(data);
};
