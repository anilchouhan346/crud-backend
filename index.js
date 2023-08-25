const jsonServer = require("json-server");
const express = require("express");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 8080;

server.use(middlewares);

// Serve images from the 'images' folder
server.use("/images", express.static(path.join(__dirname, "images")));

// Custom route to handle image requests
server.get("/image/:imageName", (req, res) => {
  const { imageName } = req.params;
  const imagePath = path.join(__dirname, "images", imageName);

  res.sendFile(imagePath);
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
