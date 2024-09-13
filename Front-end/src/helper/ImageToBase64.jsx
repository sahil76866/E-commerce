const ImageToBase64 = async (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);

    const data = await new Promise((res, rej) => {
        reader.onload = () => {
            res(reader.result);
        };
        reader.onerror = () => {
            rej(error);
        };
    });
    return data;


}

export default ImageToBase64;