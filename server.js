const path = require("path");
const express = require("express");
const app = express();
require('dotenv').config();
const { PORT = 8080 } = process.env;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

/////////// for uploading files to the server: /////////////

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


app.post("/images", uploader.single("file"), function (req, res) {
    // If nothing went wrong the file is already in the uploads directory
    if (req.file) {
        res.json({
            success: true,
        });
    } else {
        res.json({
            success: false,
        });
    }
});


app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
