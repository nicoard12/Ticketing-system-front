const preset_name = "TicketingSystem";
const cloud_name = "dsvxb2u0e";

const uploadImage = async (imagen: File): Promise<string> => {
  const data = new FormData();
  data.append("file", imagen);
  data.append("upload_preset", preset_name);

  try {
    console.log(data)
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const file: { secure_url?: string } = await response.json();
    return file.secure_url ?? "error";
  } catch (error) {
    console.error("Error uploading image:", error);
    return "error";
  }
};

export { uploadImage };