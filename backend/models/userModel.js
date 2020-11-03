import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  //since the method is called on a specific user, this keyword here refers to that user, and this.password refers to their password.
  return await bcrypt.compare(enteredPassword, this.password);
};

//Middleware that runs before the object is saved
userSchema.pre('save', async function (next) {
  //The code below is used to check if an already existing user has modified the password. Without this check, if, for example, a user modifies their name, their password will be re-hashed.
  if (!this.isModified('password')) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
