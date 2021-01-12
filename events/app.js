const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
var cors = require('cors');

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(cors());
app.use(index);

const httpServer = http.createServer(app);

const io = socketIo(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    const type = "time";
    const payload = {
        time: new Date()
    };
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", { type, payload });
};

httpServer.listen(port, () => console.log(`Listening on port ${port}`));