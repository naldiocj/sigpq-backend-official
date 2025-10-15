require("dotenv").config();

const TOTAL_MEMORY = process.env.TOTAL_MEMORY || 4048; // 49
const INSTANCES =
  process.env.INSTANCES === "max"
    ? "max"
    : parseInt(process.env.INSTANCES) || (process.env.NODE_ENV === "production" ? 15 : 4);

const WATCH_MODE = process.env.WATCH_MODE === true;

module.exports = {
  apps: [
    {
      name: "PIIPS::BACKEND",
      script: "node ace serve",
      exec_mode: process.env.EXEC_MODE || "fork",
      instances: INSTANCES,
      node_args: `--max-old-space-size=${TOTAL_MEMORY}`,
      watch: WATCH_MODE,
      time: true
    }
  ]
};
