module.exports=(sequelize,DataTypes)=>{
    const Model= sequelize.define('jobdetails',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        employeeId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        designation:{
            type:DataTypes.STRING,
            allowNull:false
        },
        departmentId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        doj:{
            type:DataTypes.DATE,
            allowNull:false
        },
        salary:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        isActive:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    },
    {
        tableName:'jobdetails',
        timestamps : true,
        paranoid : true,
        underscored : false,
    });
    Model.associate= function(models){
        this.employeeId=this.belongsTo(models.employee)
        this.departmentId=this.belongsTo(models.department)
    }   

    return Model;
}