module.exports=(sequelize,DataTypes)=>{
    const Model= sequelize.define('employee',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        firstName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        dob:{
            type:DataTypes.STRING,
            allowNull:false
        },
        isActive:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    },
    {
        tableName:'employee',
        timestamps : true,
        paranoid : true,
        underscored : false,
    });
    Model.associate = function(models){
        this.addressdetails = this.hasMany(models.addressdetails)
        this.jobdetails = this.hasMany(models.jobdetails)
        this.leavedetails= this.hasMany(models.leavedetails)
    }

    return Model;
}