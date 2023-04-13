const { fn } = require('sequelize')
const {to,ReS,ReE} = require('../global_functions');
const { get } = require('../routes/router');
const LeaveDetails = require('../models').leavedetails;
require('../config/config');

const { Op } = require('sequelize')

const addLeave = async function(req,res){
    let [err,leave] = await to(LeaveDetails.create(
        {
           employeeId : req.body.employeeId,
           startDate : req.body.startDate,
            endDate : req.body.endDate,
            reason : req.body.reason
        }
    ))
    console.log("leave details",leave);
    if(err) return ReE(res,err,422);
    if(leave) return ReS(res,leave,200)
}

module.exports.addLeave = addLeave

const getLeaveDetails = async function(req,res){
    let[err,data]= await to(LeaveDetails.findAll({
        where:{
            employeeId : req.body.employeeId,
            startDate: {[Op.between]: ["2023-10-01", "2023-10-31"]}//chatGPT
            //end date
        }
    }))
    console.log(data)
    if(err) return ReE(res,err,422)
    if(data) return ReS(res,data,200)
}

module.exports.getLeaveDetails = getLeaveDetails