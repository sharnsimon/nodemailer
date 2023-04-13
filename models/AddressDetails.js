module.exports=(sequelize,DataTypes)=>{
    const Model= sequelize.define('addressdetails',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        employeeId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        city:{
            type:DataTypes.STRING,
            allowNull:false
        },
        state:{
            type:DataTypes.STRING,
            allowNull:false
        },
        isPermanent:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    },
    {
        tableName:'addressdetails',
        timestamps : true,
        paranoid : true,
        underscored : false,
    });
    Model.associate= function(models){
        this.employeeId=this.belongsTo(models.employee)
    }

    return Model;
}