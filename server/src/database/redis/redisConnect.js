const redis = require("redis");
const dbConfig = require("../../config/dbConfig");

const client = redis.createClient({
  socket: {
    port: dbConfig.redisPort,
    host: dbConfig.redisHost,
  },
});

async function redisConnect() {
  try {
    (async () => {
      await client.connect();
    })();

    client.on("connect", () => {
      console.log("Redis Connected!");
    });

    client.on("error", (err) => {
      console.log(`Error:${err}`);
    });

    process.on("SIGINT", () => {
      client.quit();
      console.log("redis client quit");
    });
  } catch (e) {
    console.error(e);
  }
}

module.exports = { redisConnect, client };
