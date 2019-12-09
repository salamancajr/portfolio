const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'blogImg') {
      cb(null, './blogUploads')
    } else {
      cb(null, './uploads')
    }
  },

  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})

const upload = multer({
  storage: storage
})

module.exports = { upload }
