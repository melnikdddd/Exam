import nodemailer from "nodemailer";
import {google} from "googleapis";

import dotenv from "dotenv";
dotenv.config();


const oAuth2 = google.auth.OAuth2;
const oAuth2Client = new oAuth2(process.env.GOOGLE_OAUTH_CLIENT, process.env.GOOGLE_OAUTH_REFRESH_TOKEN);
const accessToken = oAuth2Client.getAccessToken();

class EmailWorker {
    constructor() {
         this.mailTransporter = nodemailer.createTransport({
             type: 'oAuth2',
             user: process.env.EMAIL_ADDRESS,
             clientId: process.env.GOOGLE_OAUTH_CLIENT,
             clientSecret: process.env.GOOGLE_OAUTH_SECRET_KEY,
             refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
             accessToken: accessToken
         })
    }

     sendMail =  async (to, subject, html) =>{
        const options = {
            from: process.env.EMAIL_ADDRESS,
            to: to,
            subject: subject,
            html: html
        }

            await this.mailTransporter.sendMail(options, (reportError, info) =>{
                return !reportError;
            })
    }
}

export default new EmailWorker;