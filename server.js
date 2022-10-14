const path = require("path");
const express = require("express");
const app = express();
require('dotenv').config();
const { PORT = 8080 } = process.env;
const fs = require("fs");

////// Part 2 /////////

const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

/////////// for uploading files to the server: /////////////

const { uploader } = require("./functions");
const { insertImage } = require("./functions");
const { getAllImages } = require("./functions");

// let { images } = require("./public/js/app");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

///////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get("/", (req, res) => {

        res.sendFile(path.join(__dirname, "index.html"));

});


app.get("/getimages", (req,res) => {

        getAllImages()
            .then((existingImages) => {
                // console.log(
                //     "existingImages after getAllImages in get request: ",
                //     existingImages
                // );
                res.json(existingImages);
            });
});



// new middleware needs to be inserted after "uploader.single()" --> will upload the new file to the cloud
app.post("/image", uploader.single("file"), (req, res) => {

    // console.log("req.body @post request: ", req.body.title[0]);

    if (req.file) {
        /////////////////////////////
        const { filename, mimetype, size, path } = req.file;

        const promise = s3
            .putObject({
                Bucket: "spicedling",
                ACL: "public-read",
                Key: filename,
                Body: fs.createReadStream(path),
                ContentType: mimetype,
                ContentLength: size,
            })
            .promise();

        promise
            .then(() => {
                console.log("success");
                // it worked!!!

                res.json({});
            })
            .catch((err) => {
                // uh oh
                console.log(err);
            });
        //////////////////

        console.log("req.file in post /image: ", req.file);

        let url = `/uploads/${req.file.filename}`;

        const newImage = {
            url: url,
            title: req.body.title[0],
            description: req.body.description[0],
            username: req.body.username[0]
        };

        insertImage(req.body.title[0], req.body.description[0], req.body.username[0], url)
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
