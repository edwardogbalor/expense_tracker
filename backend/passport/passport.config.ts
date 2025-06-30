import passport from "passport";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async (): Promise<void> => {
  passport.serializeUser((user: any, done: (err: any, id?: string) => void) => {
    console.log("Serializing user");
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done: (err: any, user?: any | null) => void) => {
    console.log("Deserializing user");
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(
      async (username: string, password: string, done: (err: any, user?: IUser | false) => void) => {
        try {
          const user = await User.findOne({ username });
          if (!user) {
            throw new Error("Invalid username or password");
          }
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            throw new Error("Invalid username or password");
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
