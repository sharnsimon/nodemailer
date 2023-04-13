const { fn,col } = require('sequelize')
const {to,ReS,ReE} = require('../global_functions');
const JobDetails = require('../models').jobdetails;
const Department = require('../models').department;
require('../config/config');

const {Op} = require('sequelize')
const addJob = async function(req,res){
    let [err,job] = await to(JobDetails.create(
        {
          employeeId:req.body.employeeId,
          designation:req.body.designation,
          departmentId:req.body.departmentId,
          doj:req.body.doj,
          salary:req.body.salary
        }
    ))
    console.log("Job Details",job)
    if(err) return ReE(res,err,422)
    if(job) return ReS(res,job,200)
}

module.exports.addJob = addJob

const getAverageSalary = async function(req,res){
    let[errAvg,datas] = await to(JobDetails.findAll({
        attributes:[
            [fn('AVG', col('salary')), 'averageSalary'],'departmentId'
        ],
        group: ['departmentId'],
        where:{
            isActive:true
        }
    }))
    console.log(datas)
    if(errAvg) return ReE(res,errAvg,422)
    if(datas) return ReS(res,datas,200)
}

module.exports.getAverageSalary = getAverageSalary

const getActiveCount = async function(req,res){

    let[errAct,active]= await to(JobDetails.findAll(
        {
            attributes:['departmentId',
                        [fn('COUNT',col('*')),'count'],'isActive'],
            group:['departmentId'],
            where:{
                isActive:true
            },
            include:{
                model:Department,
                attributes:['departmentName']
            }
        }
        
    ))
    if(errAct) return ReE(res,errAct,422)
    
    let[errAct1,inActive]= await to(JobDetails.findAll(
        {
            attributes:['departmentId',
                        [fn('COUNT',col('*')),'count'],'isActive'],
            group:['departmentId'],
            where:{
                isActive:false
            },
            include:{
                model:Department,
                attributes:['departmentName']
            }
        } 
        
    ))
    console.log(inActive)
    if(errAct1) return ReE(res,errAct1,422)
    if(active&&inActive) return ReS(res,{active,inActive},200)
    // if(dat) return ReS(res,dat,200)
}

module.exports.getActiveCount = getActiveCount

const updateJob = async function(req,res){
    let errr,data;
    empId = req.body.employeeId
    // if(isActive){}
    let[err,status] = await to(JobDetails.findAll({
       attributes:['id'],
       where:{
            employeeId:empId,
            isActive:true
       }
    }))
    if(err) return ReE(res,err,422)
    // console.log(status.isActive)
    if(status && status.length){
        const activeId = status.map(actId=> actId.id)
        console.log('check123',activeId);
        // activeId.forEach(async(ids)=>{
            let[erre,data1] = await to(JobDetails.update(
                {isActive : false,designation:'DevOps Architects'},
                {
                    where:{
                    id: {
                        [Op.in]:activeId }
    
                }
            }
            ))
            if(erre) return ReE(res,erre,422)

            console.log('data123',data1,erre);
    
        [errr,data] = await to(JobDetails.create({
            employeeId:empId,
            designation:req.body.designation,
            departmentId:req.body.departmentId,
            doj:req.body.doj,
            salary:req.body.salary,
            isActive:true
    
        } ))
    }

if(errr) return ReE(res,errr,422)
if(data) return ReS(res,data,200)
}

module.exports.updateJob = updateJob

