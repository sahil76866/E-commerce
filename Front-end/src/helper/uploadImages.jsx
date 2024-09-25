


const uploadImages = async (image) => {

    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDIARY_KEY}/image/upload`


    const formData = new FormData();

    formData.append('file', image);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDIARY_DATABASE)

    const dataResponse = await fetch(url, {
        method: 'POST',
        body: formData
    })
    return dataResponse.json();
}
export default uploadImages
