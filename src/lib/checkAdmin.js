import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const checkAdmin = async () => {
  try {
    const cookiesStore = await cookies();
    const adminToken = cookiesStore.get("adminToken")?.value;
    if (!adminToken) {
      return null;
    }
    const decode = jwt.verify(adminToken, process.env.JWT_SECRET);
    if (
      process.env.ADMIN_EMAIL !== decode.email ||
      process.env.ADMIN_PASSWORD !== decode.password
    ) {
      return null;
    }

    return decode;
  } catch (Error) {
    console.log("error while checking admin", Error);
    return null;
  }
};

export default checkAdmin;
