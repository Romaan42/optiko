"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const adminLogin = async (data) => {
  const cookiesStore = await cookies();
  const { email, password } = data;
  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return { success: false, message: "invalid email or password" };
  }

  const adminToken = jwt.sign({ email, password }, process.env.JWT_SECRET);

  cookiesStore.set("adminToken", adminToken, {
    maxAge: 24 * 60 * 60 * 1000,
  });

  return {
    success: true,
    message: "Welcome Roman Khan",
  };
};

export const adminLogout = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete("adminToken");
  return { success: true, message: "logout success" };
};
