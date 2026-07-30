import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads");
  },

  filename(req, file, cb) {
    const ext = path.extname(file.originalname);

    cb(null, Date.now() + "-" + Math.random() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/png", "image/jpeg", "image/webp"];

  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Unsupported file type."), false);
  }

  cb(null, true);
};

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
/**
 * upload.single("image")
    upload.array("images",5)
 */
