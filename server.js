const path = require("path");
const express = require("express");
const app = express();
require('dotenv').config();
const { PORT = 8080 } = process.env;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

/////////// for uploading files to the server: /////////////

const { uploader } = require("./functions");
const { insertImage } = require("./functions");
const { getAllImages } = require("./functions");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

///////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


// new middleware needs to be inserted after "uploader.single()" --> will upload the new file to the cloud
app.post("/image", uploader.single("file"), (req, res) => {
    if (req.file) {
        console.log("req.file in post /image: ", req.file);
        console.log("req.body in post /image: ", req.body);

        let url = `/uploads/${req.file.filename}`;

        const newImage = {
            src: url,
            title: req.body.title,
            description: req.body.description,
        };

        insertImage(req.body.title, req.body.description, req.body.username, url)
        .then(() => {

            res.json({
                success: true,
                message: "Thank you!",
                newImage,
            });

        });

    } else {
        res.json({
            success: false,
            message: "Upload failed!",
        });
    }
});



app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
