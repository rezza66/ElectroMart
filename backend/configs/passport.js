import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/UserModel.js";

const configurePassport = () => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY,
      },
      async (jwtPayload, done) => {
        try {
          const user = await User.findById(jwtPayload.id) 
          if (!user) {
            return done(null, false);
          }
          return done(null, user); // ⬅️ inilah yang akan ditaruh di req.user
        } catch (err) {
          console.error("Error in passport JWT strategy:", err);
          return done(err);
        }
      }
    )
  );
  
};

export default configurePassport;
