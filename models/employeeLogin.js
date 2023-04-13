const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cryptoService = require('../services/crypto.service')
const {to,ReS,ReE} = require('../global_functions');

module.exports=(sequelize,DataTypes)=>{
    const Model= sequelize.define('employeelogin',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        Name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        Email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        Password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        tableName:'employeelogin',
        timestamps : true,
        paranoid : true,
        underscored : false,
    });

    Model.beforeSave(async(user,options)=>{
        let err;
        if(user.changed('Password')){
            let salt,hash;
            let rounds = crypto.randomInt(4,10);
            [err,salt] = await to(bcrypt.genSalt(rounds));
            if(err){
                console.log('err in adding salt' + err.message)
            }
            [err,hash] = await to(bcrypt.hash(user.Password,salt))
            if(err){
                console.log('err in hashing'+ err.message)
            }
        user.Password = hash;  
        }
    })
    Model.prototype.getJWT = async function(){
        let err, encryptedToken;
        const token = "Bearer " + jwt.sign({
            id : this.id,
            email : this.Email
            }, CONFIG.jwt_encryption, {expiresIn : CONFIG.jwt_expiration});
            [err,encryptedToken] = await to(cryptoService.encrypt(token));
            if(err) TE(err);
            return encryptedToken;

    };    
    return Model;
}