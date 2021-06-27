module.exports = {
    apps : [
        {
          name: "app",
          script: "./bin/www",
          instances: 1,
          ignore_watch: ["logs"],
          autorestart: true,
          max_memory_restart: '1G',
          watch: true,
          ignore_watch: [".git/index.lock", "logs", "public", "node_modules", "[\\/\\\\]\\./","pids", ".git", ".idea"],
          env: {
              "PORT": 3000,
              "NODE_ENV": "production"
          }
        }
    ]
  }
  