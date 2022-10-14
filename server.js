require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const { PORT = 8080 } = process.env;
const fs = require("fs");

const s3 = require("./s3");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

/////////// for uploading files to the server: /////////////

const { uploader } = require("./functions");
const { insertImage } = require("./functions");
const { getAllImages } = require("./functions");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

///////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/getimages", (req, res) => {
    getAllImages().then((existingImages) => {
        // console.log(
        //     "existingImages after getAllImages in get request: ",
        //     existingImages
        // );
        res.json(existingImages);
    });
});


/////////////////////////////////////////////////////// Part 3 ////////////////////////////////////////////////////////

app.get("/image/:id", (req, res) => {
    // get id from the request
    // get image data from database, finding by id
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post("/image", uploader.single("file"), s3.upload, (req, res) => {
    // console.log("req.body @post request: ", req.body.title[0]);

    // console.log("req.file in post /image: ", req.file);

    let url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;

    const newImage = {
        url: url,
        title: req.body.title[0],
        description: req.body.description[0],
        username: req.body.username[0],
    };

    insertImage(
        req.body.title[0],
        req.body.description[0],
        req.body.username[0],
        url
    ).then(() => {
        res.json({
            success: true,
            message: "Thank you!",
            newImage,
        });

    });
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
