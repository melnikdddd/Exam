import {google} from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// const oAuth2 = google.auth.OAuth2;
// const oAuth2Client = new oAuth2(process.env.GOOGLE_OAUTH_CLIENT, process.env.GOOGLE_OAUTH_SECRET_KEY);
// const {tokens} = await oAuth2Client.getToken()
// oAuth2Client.setCredentials({refresh_token :  process.env.GOOGLE_OAUTH_REFRESH_TOKEN});
//
// const accessToken = oAuth2Client.getAccessToken();

// const oAuth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_OAUTH_CLIENT,
//     process.env.GOOGLE_OAUTH_SECRET_KEY,
//     process.env.GOOGLE_OAUTH_REDIRECT_URL,
// )
//
// const {tokens} = await oAuth2Client.getToken(process.env.GOOGLE_OAUTH_CLIENT,)
//
//
// function getGoogleAuthUrl(){
//     const scopes = [
//         "https://www.googleapis.com/auth/userinfo.profile",
//         "https://www.googleapis.com/auth/userinfo.email",
//     ]
//
//     return oAuth2Client.generateAuthUrl({
//         access_type: 'offline',
//         prompt: 'consent',
//         scope: scopes
//     })
// }