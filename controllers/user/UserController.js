import User from "../../models/user/User.js"




export const userRegister = async(req, res) =>{
    const userEmail = await User.findOne({email: req.body.email})
    if(userEmail){
        return res.json("email repeat")
    }
    try{
        await User.create({
            name: req?.body?.name,
            email: req?.body?.email,
            password: req?.body?.password,
        })
        res.json('registerd you ok')
    }
    catch(error){
        res.json(error)
    }


}