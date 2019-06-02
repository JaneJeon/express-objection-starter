const multer = require("multer")

module.exports = multer({
  limits: { fileSize: process.env.MAX_FILESIZE }
})
