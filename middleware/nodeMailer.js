import  nodemailer  from "nodemailer";
import 'dotenv/config';

//Admin Email Address
const userEmail = process.env.ADMIN_EMAIL;

//Admin Email Key
const userPassKey = process.env.ADMIN_PASSKEY;

//Nodemailer transporter Function
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: userEmail,
      pass: userPassKey
    },
  });

//To generate OTP for verification
export function generateOTP() { 
    let digits = '0123456789'; 
    let OTP = ''; 
    let len = digits.length 
    for (let i = 0; i < 4; i++) { 
        OTP += digits[Math.floor(Math.random() * len)]; 
    } 
    return OTP; 
  }

//To send Email to the users for the Authentication  
export const sendMail = async (mail,otp)=>{
    const info = await transporter.sendMail({
          from: `${userEmail}`, 
          to: mail,
          subject: "Hello ✔", 
          text: "focus on my timechamp", 
          html: `<b>Hello budy welcome again thats your otp ${otp}</b>`, 
        });
        const mailMessage = "Message sent succesfully"
        return mailMessage;
    }

    

    
