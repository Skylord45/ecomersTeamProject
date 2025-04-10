import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "./public/images/uploads");
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`);
    },
  });


//Use this upload in form when you don't have to take the images from the user
export const upload = multer({storage: storage});
//Use this upload in form when you have to take the images from the user
export const uploadImages = multer({storage: storage, limits: {fileSize: 10 * 1024 * 1024}}).array('productImgs',5);



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       return cb(null, "./public/uploads");
//     },
//     filename: function (req, file, cb) {
//       return cb(null, `${Date.now()}-${file.originalname}`);
//     },
//   });


// //Use this upload in form when you don't have to take the images from the user
// export const upload = multer({storage: storage});