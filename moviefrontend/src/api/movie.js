
import { catchErrors, getToken } from "../utils/helper";
import client from "./client"

export const uploadTrailer = async (formData , onUploadProgress)=>{
    const token =getToken()
    try {
        const { data } = await client.post("/movie/upload_trailer", formData,{
            headers :{
                authorization : 'Bearer '+token,
                'content-type' : 'multipart/form-data'
            },
            onUploadProgress : ((loaded, total)=>{
                if(onUploadProgress) onUploadProgress(Math.floor((loaded/total)*100))
            })
        });
        return data;
      } catch (error) {
        return catchErrors(error)
      }
}