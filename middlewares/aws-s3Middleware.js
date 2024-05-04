import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv"
dotenv.config();

// Configure AWS SDK
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_S3_KEY_ID,
  secretAccessKey: process.env. AWS_S3_SECRET_ACCESS_KEY,
  region: process.env. S3_REGION // Specify the region of your S3 bucket
});

// Create an instance of the S3 object
const s3 = new aws.S3();

// Define multer storage using multer-s3
export const storage = multerS3({
  s3: s3,
  bucket:"static-vision", // Specify your S3 bucket name
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    cb(null, Date.now().toString() + '-' + file.originalname);
  }
});

// Create multer middleware using multer-s3 storage
export const upload = multer({
  storage: storage
});
