module.exports = {
  apps : [
      {
        name: "nextblog",
        script: "./server.js",
        watch: true,
        env: {
          "NODE_ENV": "production",
        }
      }
  ]
}
