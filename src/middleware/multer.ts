import * as multer from "multer";
import * as path from "path";

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    }
});
const upload = multer({ storage: storage });

export default upload