import { GET_PHOTO_DATA, GET_PHOTO_FAILURE, GET_PHOTO_REQUEST, MyId, randomUrl, searchUrl } from "./actionType"
import axios from 'axios'
const photoRequest = () =>{
    return {
        type:GET_PHOTO_REQUEST
    }
}
const photoSuccess = (payload,page,query)=>{
    return{
        type:GET_PHOTO_DATA,
        payload:payload,
        page,
        query
    }
}
const photoFailure = (err,page,query) =>{
    return{
        type:GET_PHOTO_FAILURE,
        payload:err,
        page,
        query
    }
}

export const getAllPhoto =  (page,query) => dispatch=>{
    
    let url;
    const requstAction = photoRequest()
    dispatch(requstAction)
    
    if(query!=null){
        url = `${searchUrl}/${MyId}&page=${page}&query=${query}`
    }else{
        url = `${randomUrl}${MyId}&page=${page}`
    }
     axios.get(url)
     .then((res)=>{
         console.log(res.data)
         dispatch(photoSuccess(res.data,page,query))
     })
     .catch((err)=>{
         const failureAction = photoFailure(err,page,query)
         console.log("aa")
         dispatch(failureAction)
     })
}
