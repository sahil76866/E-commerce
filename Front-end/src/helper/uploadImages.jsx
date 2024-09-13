


const uploadImages = async (image) => {

    const url = `https://api.cloudinary.com/v1_1/dm3gywlh4/image/upload`


    const formData = new FormData();

    formData.append('file', image);
    formData.append('upload_preset', "Mern_Product")

    const dataResponse = await fetch(url, {
        method: 'POST',
        body: formData
    })
    return dataResponse.json();
}
export default uploadImages
