const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy
const Users=require('./db').Users

passport.serializeUser(function(user,done){
    done(user.username)
})               //stores username

passport.deserializeUser(function(username,done){
   Users.findOne ({
       username:username
   }) .then((user)=>
{ if(!user){
    return done(new Error("no such user"))
}
    return done(null,user)
}) .catch((err) =>{
    done(err)
})
})               

passport.use(new LocalStrategy(function(username,password,done) {
    Users.findone({
        where:{
            username:username
        }
    }) .then((user)=>{
        if(!user){return done(null,false,{message:"no such user"})}
        if(user.password !==password){return done(null,false,{message:"wrong password"})}
        return done(null,user)
    }).catch((err)=>{
  return done(err)
    })
}))



exports=module.exports= passport