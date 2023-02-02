const userCredSchema = require("../models/userCredSchema")

const handleLogin = async (req, res) => {
        console.log(req.body)
        pwd = req.body.password
        uname = req.body.name
        console.log(pwd)
        console.log(uname)
        /*password requirement works*/
        if(!pwd) return res.status(400).json({'message': 'Password is Required..'})
        userCredSchema.find({name: uname}, function (err, user){
          if (err){
            res.json(`Error: ${err}`)
          }else{
            if(user.length > 0 ){
             // console.log(user[0].password) this is how we access the passcode
             if(pwd==user[0].password){
              //return res.status(400).json({'message': `${uname}Succesfully signed in!}`})
              return res.status(200).json({ message: `${uname} successfully signed in!` });
             }else{
              res.status(400).send(`Login Failed: Wrong Username or Password`)
             }
            }
            else{
              res.status(400).send(`Login Failed: Wrong Username or Password`)
            }
          }
        })
}

module.exports = { handleLogin };