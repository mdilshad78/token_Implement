import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

// Hash password before saving
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

const User = mongoose.model<IUser>("User", userSchema);
export default User;

// import mongoose from "mongoose";

// interface IUser extends Document {
//     email: string;
//     password: string;
// }

// const userSchema: mongoose.Schema<IUser> = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// });

// const User = mongoose.model<IUser>("User", userSchema);
// export default User;