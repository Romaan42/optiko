"use server";
import bcrypt from "bcrypt";
import connectDb from "@/lib/db";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import checkUser from "@/lib/checkLoginUser";
import Cart from "@/models/cartModel";

export const registerUser = async (_, data) => {
  const { name, email, password } = data;
  try {
    await connectDb();

    const user = await User.findOne({ email });
    if (user) {
      return { success: false, message: "this user already exist's" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });
    return { success: true, message: "user registered successfuly" };
  } catch (error) {
    return { success: false, message: "server error" };
  }
};

export const loginUser = async (_, data) => {
  try {
    const cookiesStore = await cookies();
    await connectDb();
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: "user doesn't exist!" };
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return { success: false, message: "password wrong" };
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    cookiesStore.set("userToken", token);
    return {
      success: true,
      userId: user._id.toString(),
      message: "login successful",
    };
  } catch (error) {
    console.log("Error", error);
    return { success: false, message: "server error" };
  }
};

export const logoutUser = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete("userToken");
  return { success: true, message: "logout successful" };
};

export const userAddToCart = async (_, data) => {
  try {
    await connectDb();
    const user = await checkUser();
    if (!user) {
      return { success: false, message: "user not logged in" };
    }

    const existItem = await Cart.findOne({
      productId: data.id,
      userId: user._id,
    });
    if (existItem) {
      await Cart.findOneAndUpdate(
        { userId: user._id, productId: data.id },
        { $inc: { qty: +1 } },
      );
    } else {
      await Cart.create({ userId: user._id, productId: data.id });
    }

    return { success: true, message: "added successfully" };
  } catch (error) {
    return { success: false, message: "something went wrong" };
  }
};

export const userRemoveFromCart = async (data) => {
  try {
    await connectDb();

    const user = await checkUser();
    if (!user) {
      return { success: false, message: "User not logged in" };
    }

    const { id } = data;

    const deletedItem = await Cart.findOneAndDelete({
      _id: id,
      userId: user._id,
    });

    if (!deletedItem) {
      return { success: false, message: "Item not found" };
    }

    return { success: true, message: "Item deleted successfully" };
  } catch (error) {
    console.log("REMOVE CART ERROR:", error);
    return { success: false, message: "Something went wrong" };
  }
};

export const userUpdateQty = async (data) => {
  try {
    await connectDb();
    const user = await checkUser();
    if (!user) {
      return { success: false, message: "User not logged in" };
    }

    const { id, delta } = data; // delta = "increase" | "decrease"

    let incValue = 0;
    if (delta === "increase") incValue = 1;
    if (delta === "decrease") incValue = -1;

    if (incValue === 0) {
      return { success: false, message: "Invalid delta" };
    }

    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      { $inc: { qty: incValue } }, // <-- yahan theek kiya
      { new: true }, // updated doc wapis mile
    );

    // agar qty 0 ho jaye to item delete kar do
    if (updatedCart && updatedCart.qty <= 0) {
      await Cart.findByIdAndDelete(id);
      return { success: true, message: "Item removed from cart" };
    }

    return { success: true, message: "Qty updated" };
  } catch (error) {
    console.log("CART UPDATE ERROR", error);
    return { success: false, message: "something went wrong" };
  }
};
