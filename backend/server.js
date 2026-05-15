const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const installPanelRoute = require("./routes/installPanel");
const installNodeRoute = require("./routes/installNode");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.set("io", io);

app.use("/api/install/panel", installPanelRoute);
app.use("/api/install/node", installNodeRoute);

io.on("connection", (socket) => {
  console.log("Client connecté:", socket.id);
});

const PORT = 4000;
server.listen(PORT, () => console.log("Backend sur port", PORT));
