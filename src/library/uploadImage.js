import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const uploadImage = async (file) => {
  const date = new Date();
  const storageRef = ref(storage, `images/${date + file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);
  
  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        console.log("Error during upload:", error);
        reject(error);  
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((DownloadURL) => {
          resolve(DownloadURL)
        });
      }
    );
  });
}

export default uploadImage;
