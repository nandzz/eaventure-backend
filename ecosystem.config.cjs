const config = {
    apps : [
        {
          name: "app",
          script: "./bin/www.js",
          instances: 1,
          watch: true,
        }
    ]
  }
  export default config