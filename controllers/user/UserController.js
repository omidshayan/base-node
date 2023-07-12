import User from "../../models/user/User.js"
import asyncHandler from 'express-async-handler'
import jwt from "jsonwebtoken"


export const getUsers = asyncHandler(async(req, res) => {
    try{
        const users = await User.find({})
        res.json(users)
    }
    catch(error){
        res.json(error)
    }
})

// user cnotroller
export const userRegister = asyncHandler(
    async(req, res) =>{
        const userEmail = await User.findOne({email: req.body.email})
        if(userEmail){
            throw new Error("email is repeat :(")
        }
        try{
            await User.create({
                name: req?.body?.name,
                email: req?.body?.email,
                password: req?.body?.password,
            })
            res.json('registerd :)')
        }
        catch(error){
            res.json(error)
        }
    }
)

// check user login
export const userLogin = asyncHandler(async (req, res) =>{
    const {email , password} = req.body;
    const userFound = await User.findOne({email})
    if(userFound && (await userFound.isPasswordMatched(password))){
        const userId = userFound._id;
        const name = userFound.name;
        const email = userFound.email;
        const image = userFound.profilePhoto;
        const isAdmin = userFound.isAdmin;

        const accessToken = jwt.sign({userId,name,email,image,isAdmin},
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "20s"
                }
                
            )

            const refreshToken = jwt.sign({userId,name,email,image,isAdmin},
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: "1d"
                }
                
            )

            await User.findByIdAndUpdate(userId, {refreshToken: refreshToken})

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 24*60*60*1000
            })


        res.json({accessToken})
    }else{
         res.status(401)
         throw new Error("User not found")
    }
})


// delete

export const deleteUser = asyncHandler(async(req, res)=> {
    const id = req.params.id;
    try {
      await User.findByIdAndDelete(id)
      res.json("deleted")
    } catch (error) {
        res.json(error)
    }
})
