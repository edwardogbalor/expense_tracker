import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
const userResolver = {
    Mutation: {
        signUp: async (parent, { input }, context) => {
            try {
                const { username, name, password, gender } = input;
                if (!username || !name || !password || !gender) {
                    throw new Error("All fields are required");
                }
                // Validate gender
                if (!["male", "female"].includes(gender)) {
                    throw new Error("Gender must be either 'male' or 'female'");
                }
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    throw new Error("User already exists");
                }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                // https://avatar-placeholder.iran.liara.run/
                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
                const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
                });
                await newUser.save();
                await context.login(newUser);
                return newUser;
            }
            catch (err) {
                console.error("Error in signUp: ", err);
                const errorMessage = err instanceof Error ? err.message : "Internal server error";
                throw new Error(errorMessage);
            }
        },
        login: async (parent, { input }, context) => {
            try {
                const { username, password } = input;
                if (!username || !password) {
                    throw new Error("All fields are required");
                }
                const { user } = await context.authenticate("graphql-local", { username, password });
                await context.login(user);
                return user;
            }
            catch (err) {
                console.error("Error in login:", err);
                const errorMessage = err instanceof Error ? err.message : "Invalid username or password";
                throw new Error(errorMessage);
            }
        },
        logout: async (parent, args, context) => {
            try {
                await context.logout();
                // Properly handle session destruction
                return new Promise((resolve, reject) => {
                    context.req.session.destroy((err) => {
                        if (err) {
                            console.error("Error destroying session:", err);
                            reject(new Error("Failed to destroy session"));
                        }
                        else {
                            context.res.clearCookie("connect.sid");
                            resolve({ message: "Logged out successfully" });
                        }
                    });
                });
            }
            catch (err) {
                console.error("Error in logout:", err);
                const errorMessage = err instanceof Error ? err.message : "Internal server error";
                throw new Error(errorMessage);
            }
        },
    },
    Query: {
        authUser: async (parent, args, context) => {
            try {
                const user = context.getUser();
                if (!user) {
                    return null;
                }
                // Fetch the full user document from database
                const fullUser = await User.findById(user._id);
                return fullUser;
            }
            catch (err) {
                console.error("Error in authUser: ", err);
                throw new Error("Internal server error");
            }
        },
        user: async (parent, { userId }) => {
            try {
                const user = await User.findById(userId);
                if (!user) {
                    throw new Error("User not found");
                }
                return user;
            }
            catch (err) {
                console.error("Error in user query:", err);
                const errorMessage = err instanceof Error ? err.message : "Error getting user";
                throw new Error(errorMessage);
            }
        },
    },
    User: {
        transactions: async (parent) => {
            try {
                const transactions = await Transaction.find({ userId: parent._id });
                return transactions;
            }
            catch (err) {
                console.log("Error in user.transactions resolver: ", err);
                const errorMessage = err instanceof Error ? err.message : "Internal server error";
                throw new Error(errorMessage);
            }
        },
    },
};
export default userResolver;
