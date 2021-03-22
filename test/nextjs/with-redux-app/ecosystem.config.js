module.exports = {
  apps : [
      {
        name: "testredux",
        script: "./server.js",
        watch: true,
        env: {
          "NODE_ENV": "production",
        }
      }
  ]
}
