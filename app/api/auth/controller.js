const {User} = require('../../db/models')
const bcrpyt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module. exports = {
    sign : async(req,res,next)=>{
        try {

            const {email,password} = req.body
            const findUser = await User.findOne({where: {email: email}})

            if (findUser) {
                // console.log(findUser)
                const checkPassword = bcrpyt.compareSync(password, findUser.password)
                
                if (checkPassword) {
                    const Token  = jwt.sign(
                        {
                        user:{
                            id: findUser.id,
                            name: findUser.id,
                            email: findUser.email
                        }
                    },'secret')
                return res.status(200).json({message : "Success", data: Token})
                }
                return res.status(403).json({message : "Invalid Password"})
            }else{  
                return res.status(403).json({message: "email User Not Found"})
            }
        } catch (error) {
            next(error)
        }
    },
    signup: async (req,res,next) =>{
        try {
            const {name,email,password,confirmPassword,role} = req.body

            if (password != confirmPassword) {
                res.status(403).json({message:"password and confirm password dosen't Match"})
            }
            const checkEmail = await User.findOne({where :{email}})
            console.log(checkEmail)
            if (checkEmail) {
                return res.status(403).json({message: "Email was registerd"})
            }
            const passwordUser = bcrpyt.hashSync(password,10)
            const user = await User.create({
                name,email,password: passwordUser, role:'admin'
            })

            delete user.dataValues.password
            
            res.status(200).json({message:"Register was Success",data: user})
        } catch (error) {
            next(error)
        }
    }
}