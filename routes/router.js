var express = require('express')
var router = express.Router();
var passport = require('passport')

//Controllers----------------

let addressController = require('../controllers/address.controller');
let departmentController = require('../controllers/department.controller')
let employeeController = require('../controllers/employee.controller')
let jobController = require('../controllers/job.controller')
let leaveController = require('../controllers/leavedetails.controller');
let empLoginController = require('../controllers/employeeLogin.controller');
let mailController = require('../controllers/mail.controller')
require('../middleware/passport')(passport);
// const passport = require('../middleware/passport');

//ROUTE TO INSERT VALUES

router.post('/addAddress',addressController.addAddress);
router.post('/addDepartment',departmentController.addDepartment);
router.post('/addEmployee',employeeController.addEmployee);
router.post('/addJob',jobController.addJob);
router.post('/addleave',leaveController.addLeave);
router.post('/addEmployeeLogin',empLoginController.addEmployeeLogin)

//ROUTE TO GET INFORMATION
router.get('/sendMessage',mailController.sendMessage)
router.get('/createSignup',mailController.createSignup)
router.get('/getEmployeeJobDetails',employeeController.getEmployeeJobDetails)
router.get('/getLeaveDetails',leaveController.getLeaveDetails)
router.get('/getEmployeeBySalary',employeeController.getEmployeeBySalary)
router.get('/getAverageSalary',jobController.getAverageSalary)
router.get('/getActiveCount',jobController.getActiveCount)
router.put('/updateJob',jobController.updateJob)
router.get('/deleteDepartment/:id',departmentController.deleteDepartment)
router.get('/login',empLoginController.login)
router.get('/check',passport.authenticate('jwt',{ session:false }),
    function(req,res,next){
        console.log('check123',req.user);
    res.send('done ' + req.user.email)
    })
module.exports=router;

//Update

