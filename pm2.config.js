/* eslint-disable */

const ecosystemConfig = {
  apps: [{
    name: "api.webbuniverse.com",
    script: "./dist/server.js",
    listen_timeout : 5000,
    kill_timeout : 5000,
    exp_backoff_restart_delay: 100,
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    combine_logs: true,
    time: true,
  }],
};

module.exports = ecosystemConfig;
