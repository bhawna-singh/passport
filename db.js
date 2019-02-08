const Sequelize=require('sequelize')

const db=new Sequelize(
'userdb',
'userdb',
'userdb',
{
    host:'localhost',
    dialect:'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },

operatorsAliases: false,
});

const Users=db.define('users',{
    username:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },

    password:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    firstName:Sequelize.STRING,
    lastName:Sequelize.STRING
})

db.sync().then(()=>console.log("database is ready"))

exports=module.exports={
    db,Users
}