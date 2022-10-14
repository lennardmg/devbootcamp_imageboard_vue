const path = require("path");
const multer = require("multer");
const uidSafe = require("uid-safe");

// for the database //
require("dotenv").config();
const spicedPg = require("spiced-pg");
const DATABASE_URL = process.env.DATABASE_URL;
const db = spicedPg(DATABASE_URL);
//

const storage = multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: (req, file, callback) => {
        uidSafe(24).then((uid) => {
            const extension = path.extname(file.originalname);
            const randomFileName = uid + extension;
            callback(null, randomFileName);
        });
    },
});


module.exports.uploader = multer({
    storage,
    limits: {
        fileSize: 2097152,
    },
});


module.exports.insertImage = function (title, description, username, url) {
    const sql = `
        INSERT INTO images (title, description, username, url)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    return db
        .query(sql, [title, description, username, url])
        .then((result) => result.rows)
        .catch((error) => console.log("error in insertUser function", error));
};


module.exports.getAllImages = function () {
    const sql = `
        SELECT title, description, username, url FROM images;
    `;
    return db
        .query(sql)
        .then((result) => result.rows)
        .catch((error) => console.log("error in insertUser function", error));
};

