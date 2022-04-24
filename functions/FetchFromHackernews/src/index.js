const sdk = require("node-appwrite");
const fetch = require("node-fetch");

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

  // You can remove services you don't use
  let account = new sdk.Account(client);
  let avatars = new sdk.Avatars(client);
  let database = new sdk.Database(client);
  let functions = new sdk.Functions(client);
  let health = new sdk.Health(client);
  let locale = new sdk.Locale(client);
  let storage = new sdk.Storage(client);
  let teams = new sdk.Teams(client);
  let users = new sdk.Users(client);

  if (
    !req.env["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.env["APPWRITE_FUNCTION_API_KEY"]
  ) {
    console.warn(
      "Environment variables are not set. Function cannot use Appwrite SDK."
    );
  } else {
    client
      .setEndpoint(req.env["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.env["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.env["APPWRITE_FUNCTION_API_KEY"])
      .setSelfSigned(true);
  }

  const hackersNewsApiUrl =
    "https://hn.algolia.com/api/v1/search?tags=front_page";

  const data = await fetch(hackersNewsApiUrl);
  const json = await data.json();

  const stories = json.hits;

  const NEWS_COLLECTION_ID = req.env["APPWRITE_FUNCTION_NEWS_COLLECTION_ID"];

  const promises = stories.map(async (story) => {
    try {
      await database.getDocument(NEWS_COLLECTION_ID, story.objectID);
      return null;
    } catch (e) {
      try {
        await database.createDocument(NEWS_COLLECTION_ID, story.objectID, {
          title: story.title,
          authorName: story.author,
          url: story.url,
          createdAt: story.created_at_i,
          source: "hackernews",
        });
      } catch {
        return null;
      }
    }
  });
  await Promise.all(promises);

  res.json({ success: true });
};
