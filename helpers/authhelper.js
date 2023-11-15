import bcrypt from "bcrypt";

export const hashingPassword = async (password) => {
  try {
    const saltrounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltrounds);
    return hashedpassword;
  } catch (error) {
    console.log("error while hashing password", error);
  }
};
export const comparePassword = async (password, hashedpassword) => {
  return bcrypt.compare(password, hashedpassword);
};
