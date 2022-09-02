const uploadImage = (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(403).json({
                message: 'No File Upload'
            })
        }
        return res.status(201).json({
            message: 'Success',
            data: {
                src: `/uploads/${req.file.filename}`
            }
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    uploadImage
}