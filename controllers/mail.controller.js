const mailService = require('../services/mail.service')
const fs = require('fs')
const { fn,col } = require('sequelize')
const {to,ReS,ReE,TE} = require('../global_functions');
const employeeLogin = require('../models').employeelogin;
require('../config/config');
const createSignup = async function(req,res){
    let body = req && req.body ? req && req.body:null;
    console.log(body)
    let err,employeeData,error,signupMail;
    if(body){
        [err,employeeData] = await to(employeeLogin.create(req.body));
        if(err) return ReE(res,err,422);
        if(employeeData){
            [error,signupMail] = await to(mailService.sendMail(body.Email,
                '<h1> hii %employeeName% </h1><p>your mail %Email% has been registered.</p><br><h4>Have a nice day %employeeName%</h4>',{
                    employeeName : body.Name,
                    Email: body.Email
                })) 
                if(error) return ReE(res,error,422)
                
            }
            if(signupMail) return ReS(res,{employeeData},200)
            
        }
}
module.exports.createSignup = createSignup

const sendMessage = async (req,res)=>{
    const content = fs.readFileSync('./views/page.html','utf8');
    console.log('check123',content);
    let [error,mailSent] = await to(mailService.sendMail(req.body.Email,content.toString(),{
        head:"We are here to help You !!!!",
        headMessage:"10 Web developers commented on this project",
        name1:"Arun",
        name2:"Yosep",
        name3:"Benz",
        Message1:"Nice project",
        Message2:"Enthusiastic!!!",
        Message3:"Simply good"
    }));
    console.log('check123',error);
    if(error) return ReE(res,error,422)
    if(mailSent) return ReS(res,mailSent,200)

}

module.exports.sendMessage = sendMessage