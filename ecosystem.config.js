const instances = process.env.WEB_CONCURRENCY || 0
const maxMemory = process.env.WEB_MEMORY || 512

module.exports = {
  apps: [
    {
      script: "server.js",
      instances,
      exec_mode: "cluster",
      max_memory_restart: maxMemory + "M",
      node_args: "--optimize-for-size",
      env: { NODE_ENV: "production" }
    },
    {
      script: "worker.js",
      instances,
      max_memory_restart: maxMemory + "M",
      node_args: "--optimize-for-size",
      env: { NODE_ENV: "production" }
    }
  ]
}
