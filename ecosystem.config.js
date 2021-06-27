module.exports = {
    apps : [
        {
          name: "app",
          script: "./bin/www",
          instances: 1,
          exec_mode: "cluster",
          watch: true,
          env: {
              "PORT": 3000,
              "NODE_ENV": "production"
          }
        }
    ]
  }
  