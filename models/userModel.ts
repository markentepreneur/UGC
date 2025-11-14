import { ErrorTypes } from "@/types/ErrorTypes";
import { userRoles, UserRoles } from "@/types/UserRoles";
import mongoose, { Model, Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  _id: string;
  email: string;
  role: UserRoles;
  password: string | undefined;
  paidAt?: Date;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type UserModel = Model<UserDocument>;

export const userSchema = new mongoose.Schema<UserDocument, UserModel>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Please write a correct email"],
    },

    role: {
      type: String,
      enum: Object.values(userRoles),
      default: UserRoles.admin,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, ErrorTypes.invalidLength],
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const User = (mongoose.models.User ||
  mongoose.model("User", userSchema)) as UserModel;
