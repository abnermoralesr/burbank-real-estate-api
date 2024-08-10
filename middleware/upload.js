import util from "util";
import multer from "multer";
const maxSize = 4 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    file.originalname = Date.now() + '-' + file.originalname;
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let upload = util.promisify(uploadFile);

export default upload;