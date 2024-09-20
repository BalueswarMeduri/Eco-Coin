import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

export const uploadImageToImagga = async (imagePath) => {
  try {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));

    const response = await axios.post(process.env.IMAGGA_API_ENDPOINT, formData, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.IMAGGA_API_KEY}:${process.env.IMAGGA_API_SECRET}`).toString('base64')}`,
        ...formData.getHeaders(),
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
