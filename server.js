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
const { getImage } = require("./functions");
const { getAllComments } = require("./functions");
const { insertComment } = require("./functions");

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
    // console.log("req.params in get request image/:id ", req.params);

    getImage(req.params.id).then((infoAboutImage) => {

        res.json(infoAboutImage);
    })
});

////////////////////////////////////////////////////   Part 4  ///////////////////////////////////////////////////////


app.get("/comments/:imageId", (req, res) => {

    // console.log("req.params, ", req.params);

    getAllComments(req.params.imageId).then((allTheComments) => {

        // console.log("all the comments: ", allTheComments);

        res.json(allTheComments);
    })

});



app.post("/comments", (req, res) => {

    // console.log("req.params in post /comments: ", req.params);
    // console.log("req.body in post /comments: ", req.body);
    // console.log("req: ", req);

       const newComment = {

           image_id: req.body.image_id,
           comment: req.body.comment,
           username: req.body.username,
       };

       insertComment(
           req.body.image_id,
           req.body.username,
           req.body.comment
       ).then(() => {
           res.json({
               success: true,
               comment_message: "Thanks for your comment!",
               newComment,
           });
       });

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
