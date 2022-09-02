const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix+file.originalname.split(" ").join("-"))
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb({
            message: 'Unsupport file format'
        }, false)
    }
}

const uploadMiddleware =  multer({
    storage: storage,
    limits: {
        fieldSize: 3000000,
    },
    fileFilter: fileFilter,
})

module.exports = uploadMiddleware;