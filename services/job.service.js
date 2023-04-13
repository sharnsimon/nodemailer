const { fn,col } = require('sequelize')
const {to,ReS,ReE,TE} = require('../global_functions');
const JobDetails = require('../models').jobdetails;
const Department = require('../models').department;
require('../config/config');

const deleteDeptDetails = async function(dept, transactionDetails){
    let [err,delDept] = await to(JobDetails.destroy({
        where: {
            departmentId:dept
        },
        transaction:transactionDetails
    }))
    if(err) return TE(err.message)
    if(delDept) return deleteDeptDetails

}

module.exports.deleteDeptDetails = deleteDeptDetails