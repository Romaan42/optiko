import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

const checkUser = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("userToken")?.value;

  if (!token) {
    return null;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) return null;

  const user = await User.findById(decoded.id);
  if (!user) {
    return null;
  }
  return user;
};

export default checkUser;
