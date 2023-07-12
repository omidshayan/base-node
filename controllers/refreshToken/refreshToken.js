import jwt from "jsonwebtoken";
import User from "../../models/user/User.js";
export const refreshToken = async(req, res) => {
     try {
          const refreshToken = req.cookies.refreshToken;
          if(!refreshToken) return res.json("not token");
          const user = await User.findOne({refreshToken: refreshToken})
          if(!user) return res.json("not found user")
          jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
               if(err) return res.sendStatus(403)
               const userId = user._id;
               const firstName = user.firstName;
               const lastName = user.lastName;
               const emailuser = user.email;
               const profilePhoto = user.profilePhoto;
               const admin = user.isAdmin;
               const isAccountVerified = user.isAccountVerified;
               const accessToken = jwt.sign(
                    {
                      userId,
                      firstName,
                      lastName,
                      emailuser,
                      profilePhoto,
                      admin,
                      isAccountVerified,
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                      expiresIn: "20s",
                    }
                  );

                  res.json({accessToken})
          })

     } catch (error) {
          console.log(error);
     }
}