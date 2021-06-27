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
          env: {
              "PORT": 3000,
              "NODE_ENV": "production"
          }
        }
    ]
  }
  