import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
	username: string;
	name: string;
	password: string;
	profilePicture?: string;
	gender: "male" | "female";
}

const userSchema = new Schema<IUser>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		profilePicture: {
			type: String,
			default: "",
		},
		gender: {
			type: String,
			enum: ["male", "female"],
			required: true,
		},
	},
	{ timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;