import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadOnCloud = async (file) => {
  if (!file) return null;

  try {
    const arrayBuffer = await file?.arrayBuffer();
    const buffer = Buffer(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result?.secure_url ?? null);
          }
        },
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    return null;
  }
};

export default uploadOnCloud;
