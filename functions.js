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
        .catch((error) => console.log("error in insertImage function", error));
};


module.exports.getAllImages = function () {
    const sql = `
        SELECT * FROM images
        ORDER BY id DESC;
    `;
    return db
        .query(sql)
        .then((result) => result.rows)
        .catch((error) => console.log("error in GetAllImages function", error));
};


module.exports.getImage = function (id) {
    const sql = `
        SELECT * FROM images WHERE id = $1;
    `;
    return db
        .query(sql, [id])
        .then((result) => result.rows[0])
        .catch((error) => console.log("error in getImage function", error));
};


module.exports.getAllComments = function (image_id) {
    const sql = `
        SELECT * FROM comments
        ORDER BY id DESC 
        WHERE image_id = $1;
    `;
    return db
        .query(sql, [image_id])
        .then((result) => result.rows)
        .catch((error) => console.log("error in getAllComments function", error));
};


module.exports.insertComment = function (image_id, username, comment) {
    const sql = `
        INSERT INTO comments (image_id, username, comment)
        VALUES ($1, $2, $3)
    `;
    return db
        .query(sql, [image_id, username, comment])
        .then((result) => result.rows)
        .catch((error) =>
            console.log("error in getAllComments function", error)
        );
};
