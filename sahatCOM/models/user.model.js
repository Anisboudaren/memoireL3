const Joi = require("joi-oid");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "usertype",
      unique: true,
    },
    usertype: {
      type: String,
      enum: ["Caregiver", "Patient", "Admin"],
    },
  },
  { timestamps: true }
);

// used while encrypting user entered password
userSchema.pre("save", async function () {
  var user = this;
  if (!user.isModified("password")) {
    return;
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (err) {
    throw err;
  }
});

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  owner: Joi.objectId().required(),
  usertype: Joi.string().valid("Caregiver", "Admin", "Patient"),
});

userSchema.methods.validateUser = function (userObject) {
  schema.required();
  return schema.validate(userObject);
};

//used while signIn decrypt
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    console.log(candidatePassword, this.password);
    // @ts-ignore
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
