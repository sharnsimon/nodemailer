module.exports=(sequelize,DataTypes)=>{
    const Model= sequelize.define('department',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        departmentName:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        tableName:'department',
        timestamps : true,
        paranoid : true,
        underscored : false,
    });

    Model.associate = function(models){
        this.jobdetails = this.hasOne(models.jobdetails)
    }

    return Model;
}