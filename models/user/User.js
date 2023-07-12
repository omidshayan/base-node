import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    image:{
        type: String,
        default: ''
    },
    bio:{
        type: String
    },
    phone:{
        type: String
    },
    password:{
        type: String
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    state:{
        type: Boolean,
        default: true
    },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,
    refreshToken:{
         type: String,
    },
    startDate: { type: Date, default: new Date().getTime() },

},

{
  toJSON: {
       virtuals: true
  },
  toObject: {
       virtuals: true,
  }  ,
  timestamps: true
    
})

// user password hash
userSchema.pre("save", async function (next){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    next()
})

// check user password for login
userSchema.methods.isPasswordMatched = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model("User", userSchema)