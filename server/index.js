const app = require("./app.js");
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io")

const mongoose = require("mongoose");
const Document = require("./document");
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log(`database connected to ${process.env.MONGO_URL}`));

  const io = new Server(server, {
    cors: {
      // origin: "http://localhost:3000",
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const port = 3001;

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("create-document", async ({ id, userId, emailId }) => {
    socket.join(id);
    try {
      const document = await Document.create({
        _id: id,
        owner: {
          userId,
          emailId,
        },
        name: "untitled",
        data: null,
      });
      //   console.log("Document created:", document);
      socket.emit("document-created", id);
    } catch (error) {
      console.error("Error creating document:", error); // Log any errors that occur
    }
  });

  socket.on("get-documents", async ({ id, userId, emailId }) => {
    const document = await Document.findById(id);
    socket.join(id);
    if (!document) {
      socket.emit("document-not-found");
      return;
    }
    // console.log(document);

    if (document.owner.userId !== userId) {
      //   console.log("1");
      if (!document.shared.some((obj) => obj.userId === userId)) {
        // console.log("2");
        document.shared.push({
          userId,
          emailId,
        });
        await document.save();
      }
    }
    //socket.emit
    io.to(id).emit("load-documents", {
      document: document.data,
      owner: document.owner,
      sharedWith: document.shared,
      name: document.name,
    });

    socket.on("send-changes", (delta) => {
      //socket.broadcast
      socket.broadcast.to(id).emit("recieve-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(id, { data });
    });

    socket.on("name-change", async (name) => {
      document.name = name;
      await document.save();
      socket.emit("changed-name", name);
    });
  });

  socket.on("get-readonly-document",async(id) => {
    const document = await Document.findById(id);
    socket.join(id);
    if (!document) {
      io.to(id).emit("document-not-found");
      return;
    }
    io.to(id).emit("load-readonly-document", {
      document: document.data,
    });
  })

  socket.on("get-owned-docs", async ({ userId }) => {
    socket.join(userId);
    const documents = await Document.find({ "owner.userId": userId });
    io.to(userId).emit("recieve-owned-docs", documents);
  });

  socket.on("get-shared-docs", async ({ userId }) => {
    socket.join(userId);
    const documents = await Document.find({
      shared: { $elemMatch: { userId: userId } },
    });
    io.to(userId).emit("recieve-shared-docs", documents);
  });

  socket.on("disconnect-user",(id) => {
    socket.leave(id)
    console.log("user left")
  })

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

server.listen(port, (req, res) => {
  console.log(`server running at Port:${port}`);
});
