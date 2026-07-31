import connectDb from "@/lib/db";
import Product from "@/models/productModel";

export const POST = async (request) => {
  try {
    await connectDb();
    const {
      title,
      description,
      price,
      comparePrice,
      color,
      stock,
      category,
      shape,
      sizes,
      status,
      brand,
      images,
    } = await request.json();

    console.log({
      title,
      description,
      price,
      comparePrice,
      color,
      stock,
      category,
      shape,
      sizes,
      status,
      brand,
    });

    await Product.create({
      title,
      description,
      price,
      brand,
      sizes: sizes.split(","),
      stock,
      images,
      isActive: status === "active" ? true : false,
      colors: color,
      category,
    });

    return Response.json({
      success: true,
      message: "product added successfully",
    });
  } catch (error) {
    console.log("error while add product:", error);
    return Response.json(
      { success: false, message: "error while adding product" },
      { status: 500 },
    );
  }
};
