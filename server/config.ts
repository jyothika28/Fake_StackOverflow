// Add configuration setting for your server to this file
// Config for local testing, that is, without docker.
const MONGO_URL = "mongodb://127.0.0.1:27017/fake_so";
const CLIENT_URL = "http://localhost:3000";
const port = 8000;

export {
    MONGO_URL,
    CLIENT_URL,
    port
};