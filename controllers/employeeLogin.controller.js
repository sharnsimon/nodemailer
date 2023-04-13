const { fn,col } = require('sequelize')
const {to,ReS,ReE} = require('../global_functions');
const employeeLogin = require('../models').employeelogin;
require('../config/config');


const addEmployeeLogin = async function(req,res){
    let [err,employee] = await to(employeeLogin.create(
       req.body
    ))
    console.log('employee',employee);
    if(err) return ReE(res,err,422);
    if(employee) return ReS(res,employee,200)
}

module.exports.addEmployeeLogin = addEmployeeLogin

const login = async function(req,res){
    let employeeDetails = {}
    let [err,user] = await to(employeeLogin.findOne({
        where:{
            Email : req.body.Email
        }
    }));
    if (err) return ReE(res,err,422);
    console.log('user Password',user);
    [err,token] = await to(user.getJWT())
    if(err) return ReE(res,err,422);
    if(user && token){
        employeeDetails['user'] =user;
        employeeDetails['token'] = token;
    }
    if(employeeDetails) return ReS(res,employeeDetails,200);
}

module.exports.login = login;