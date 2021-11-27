import { GET_PHOTO_DATA, GET_PHOTO_FAILURE, GET_PHOTO_REQUEST } from "./actionType"

const initState = {
    data:[],
    isLoading: false,
    isError: false,
    page: 1,
    query: null
}

export const PhotoReducer = (state = initState,{type,payload,currPage,query})=>{
    switch(type){
        case GET_PHOTO_DATA: {
            return{
                ...state,
                data:payload,
                isLoading:false,
                page:currPage,
                query:query
            }
        }
        case GET_PHOTO_REQUEST:{
            return {
                ...state,
                isLoading:true,
                isError:false,
                page:currPage,
                query:query
            }
        }
        case GET_PHOTO_FAILURE: {
            return{
                ...state,
                isLoading:false,
                isError:payload,
                page:currPage,
                query:query
            }
        }
        default:
            return state
    }
}