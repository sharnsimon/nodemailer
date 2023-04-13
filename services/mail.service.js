const nodeMailer = require("nodemailer")
const {to,ReS,ReE,TE} = require('../global_functions');
require('../config/config')


const sendMail = async function(toMail,mailContent,keyObject){
    const sender = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user:CONFIG.user,
            pass:CONFIG.pass
        },
        host:"smtp.gmail.com",
        port:465
    });

    for(let key in keyObject){
        const replaceText = "%" + key + "%";
        const replaceRegExp = new RegExp(replaceText,'g')
        mailContent=mailContent.replace(replaceRegExp,keyObject[key])
    }

    const composeMail={
        from:"jeffbezos@amazon.com",
        to:toMail,
        subject:'Test Mail',
        html: mailContent
    };


    // this sendMail used is a builtin function
    let [err, response] = await to(sender.sendMail(composeMail));
    if(err) TE(err)
    return response;    
}

module.exports.sendMail = sendMail