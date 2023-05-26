const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    const { originalname } = file;

    const fileName = file.fieldname + '-' + Date.now() + '-' + originalname;

    callback(null, fileName);
  },
  destination: path.join(__dirname, '../../../images'), //base on path this multer handler
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(
      {
        message: 'Format must be JPG, JPEG, PNG',
        field: file.fieldname,
      },
      false
    );
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter,
});

const uploadHandler = upload.array('image', 5);

module.exports = async (req, res, next) => {
  uploadHandler(req, res, (err) => {
    if (err) {
      return res.status(422).json({
        code: 422,
        message: err.message || err,
      });
    }

    req.fileImageNames = req.files.map((file) => file.filename);

    next();
  });
};
