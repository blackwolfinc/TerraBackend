const multer = require('multer');

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    const { originalname } = file;

    const fileName = file.fieldname + '-' + Date.now() + '-' + originalname;

    callback(null, fileName);
  },
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
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter,
});

const uploadHandler = upload.array('image', 2);

module.exports = async (req, res, next) => {
  uploadHandler(req, res, (err) => {
    if (err) {
      return res.status(422).json({
        code: 422,
        message: err.message || err,
      });
    }

    if (!req.file) {
      return res.status(422).json({
        code: 422,
        message: 'Please check your input data',
        errors: {
          file: ['Must be exist', 'Can not be empty'],
        },
      });
    }

    if (!req.body.fileName) {
      return res.status(422).json({
        code: 422,
        message: 'Please check your input data',
        errors: {
          fileName: ['Must be exist', 'Can not be empty'],
        },
      });
    }

    next();
  });
};
