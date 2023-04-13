const { fn } = require('sequelize')
const {to,ReS,ReE} = require('../global_functions');
const Employee = require('../models').employee;
const JobDetails = require('../models').jobdetails;
require('../config/config');

const { Op } = require('sequelize')

const addEmployee = async function(req,res){
    let [err,employee] = await to(Employee.create(
        {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            dob:req.body.dob
        }
    ))
    console.log('Employee Details',employee);
    if(err) return ReE(res,err,422);
    if(employee) return ReS(res,employee,200)
}

module.exports.addEmployee = addEmployee

const getEmployeeJobDetails = async function(req,res){
    let [err,data] = await to(Employee.findAll({
        include:{
            model : JobDetails}
            // where condition missing
    }

    ))
    console.log(data)
    if(err) return ReE(res,err,422);
    if(data) return ReS(res,data,200);
}

module.exports.getEmployeeJobDetails= getEmployeeJobDetails

const getEmployeeBySalary = async function(req,res){
    let [err,empId]= await to(JobDetails.findAll({
        attributes:['employeeId'],
        where:{
            salary:{
                [Op.gt]:25000 //ChatGPT
            }
        }
    }))
    console.log(empId)
    const empIds = empId.map(dataValues => dataValues.employeeId); //ChatGPT

    console.log(empIds)
    if(err) return ReE(res,err,422)

    let[errr,data]=await to(Employee.findAll({
        attributes:['firstName','lastName'],
        where:{
            id:empIds
        }
    }))
    console.log(data)
    if(errr) return ReE(res,errr,422)
    if(data) return ReS(res,data,200)
}
module.exports.getEmployeeBySalary = getEmployeeBySalary

