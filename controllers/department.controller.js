const { fn } = require('sequelize')
const {to,ReS,ReE} = require('../global_functions');
const Department = require('../models').department;
const jobService = require('../services/job.service')
const DeptService = require('../services/department.service')
require('../config/config')
const models= require('../models/index')
const addDepartment = async function(req,res){
    let [err,department] = await to(Department.create(
        {
          departmentName:req.body.departmentName
        }
    ))
    console.log("Department Details",department)
    if(err) return ReE(res,err,422)
    if(department) return ReS(res,department,200);
}

module.exports.addDepartment = addDepartment

const deleteDepartment = async function (req,res){
  return await models.sequelize.transaction().then(async (transaction)=>{
    try{
        let[err,jobs] = await to(jobService.deleteDeptDetails(req.params.id,transaction));
        if(err) return ReE(res,err,422);
        let[errr,dept] = await to(DeptService.deleteDept(req.params.id,transaction));
        if(errr) return ReE(res,errr,422);
        if(dept) await transaction.commit();
     }
    catch(err){
      transaction.rollback();
      console.log(err.message);
      return ReE(res,err,406)

    }
  })
}

module.exports.deleteDepartment = deleteDepartment