// import {v2 as cloudinary} from 'cloudinary';
import pkg from 'cloudinary';
const {v2: cloudinary} = pkg;
import fs from "fs"

cloudinary.config({ 
    cloud_name: 'dozcrwtud', 
    api_key: '282728854986329', 
    api_secret: 'mPZMyXc7Eh9ebPKfZymBqtyZCXc' 
});


const uploadOnCloude = async (localPath) => {

    try {
        if(!localPath) {
            return null;
        }

        const respone = await cloudinary.uploader.upload(localPath, {
            resource_type : "auto"
        })
        
        fs.unlinkSync(localPath);
        return respone;


    } catch (error) {
        fs.unlinkSync(localPath);
        return null;
    }
}

export { uploadOnCloude }