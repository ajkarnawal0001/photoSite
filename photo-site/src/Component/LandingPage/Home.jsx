import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MyId, randomUrl, searchUrl } from '../Redux/actionType'
import { Search } from '../SearchBar/Search'
import  './Home.css'
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'
import { customStyles, ModelImage } from './ModelStyle'
import { RightCarousel } from '../Carousel/RightCarousel'
import { LoginPage } from '../LoginSignup/LoginPage'

export const Home = () => {
    const [page,setPage] = useState(1)
    const [query,setQuery] = useState("")
    const [photo,setPhoto] = useState([])
    const [loading,setLoading] = useState(false)
    const [currentImage,setCurrenetImage] = useState(null)
    const [show,setShow] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        fetchPhotos(page,query)
    },[page,query])

    const fetchPhotos = async(page,query)=>{
        setLoading(true)
        let url;
        if(query){
            url = `${searchUrl}${MyId}&page=${page}&query=${query}`
        }else{
            url = `${randomUrl}${MyId}&page=${page}`
        }
        axios.get(url)
        .then((res)=>{
            let data = res.data
            setPhoto((oldPhoto)=>{
                if(query && page===1){
                    return [...data.results]
                }else if(query && page){
                    return [...oldPhoto,...data.results]
                }
                else{
                    // console.log(data);
                    return [...oldPhoto,...data]
                }
            })
            setLoading(false)
        }).catch((err)=>{
            setLoading(false)
            console.log("error+");
        })
    }

    useEffect(()=>{
        const event = window.addEventListener("scroll",()=>{
            if((!loading && window.innerHeight + window.scrollY) >= document.body.scrollHeight-2){
                setPage((oldPage)=>{
                    return oldPage+1
                })
            }
        })
        return () => window.removeEventListener("scroll",event)
    },[])
    const openModel= (item)=>{
    setCurrenetImage(item.urls.regular)   
    console.log(currentImage)
    }
    console.log(photo);
    const handleSearch = (payload)=>{
        setQuery(payload)
        setPage(1)
        console.log(payload);
    }
    const handleSign=(value)=>{
        setShow(value)
    }
    return (
        <Cont>
            {/* <Modal isOpen={!!currentImage} onRequestClose={()=>setCurrenetImage(null)} style={customStyles}> */}
            <LoginPage show={show} handleSign={handleSign} />
            {/* </Modal> */}
            <Modal isOpen={!!currentImage} onRequestClose={()=>setCurrenetImage(null)} style={customStyles}>
            <ModelImage src={currentImage} alt="Sorry"/>
            </Modal>
            

            <Search handleSearch={handleSearch}/>
            <RightCarousel/>
            <div className="grid js-grid hover14 column">
            {(photo&&(
                photo.map((item)=>(
                    <div key={item.id} onClick={()=>openModel(item)} className="item">   
                    <figure>
                    <img src={item.urls.small} alt="" />
                        </figure>           
                        <span>Click to preview</span>      
                </div>
                ))
                ))}
                </div>
                        
        </Cont>
    )
}
const SearchBox = styled.div`
    margin:2rem auto;
`
const Cont = styled.div`
    width:100%;
    margin:2rem auto;
    & .grid{
        display: grid;
        grid-template-columns: auto auto auto auto;
        grid-gap: 35px;
    }
`



