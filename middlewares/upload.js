const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        // cb(null, 'profile-picture-' + Date.now() + '.' + filetype);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + filetype);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
