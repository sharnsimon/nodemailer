const { fn } = require('sequelize')
const {to,ReS,ReE} = require('../global_functions');
const Address = require('../models').addressdetails;
require('../config/config');

const addAddress = async function(req,res){
    let [err,address] = await to(Address.create(
        {
            employeeId:req.body.employeeId,
            address:req.body.address,
            city:req.body.city,
            state:req.body.state
        }
    ))
    console.log("Address data",address);
    if(err) return ReE(res,err,422);
    if(address) return ReS(res,address,200)
}   

module.exports.addAddress = addAddress