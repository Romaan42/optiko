import checkUser from "@/lib/checkLoginUser";
import connectDb from "@/lib/db";

export const GET = async () => {
  try {
    await connectDb();
    const user = await checkUser();
    if (!user) {
      return Response.json({
        success: false,
        user: null,
        message: "user not logged in ",
      });
    }

    return Response.json({ success: true, user, message: "user logged in" });
  } catch (error) {
    return Response.json({ success: false, message: "server error" });
  }
};
