import twilio from "twilio";

const ACCOUNT_SID = "AC0cab9f615bfaa5f264f1e7ca112e782b";
const AUTH_TOKEN = "bd897b6ca3af0ccc32b39a030ec05e50";

const DEFAULT_FROM = "iMarket";


const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

export const _sendMessage =  (body, to) =>{
    client.messages
        .create({
            body: body,
            from: '+13156418414',
            to: to
        })
        .then(message => console.log(message.sid))
}