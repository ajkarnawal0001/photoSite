import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MyId, randomUrl, searchUrl } from '../Redux/actionType'
import { Search } from '../SearchBar/Search'
import  './Home.css'
import Modal from 'react-modal'
import { customStyles, ModelImage } from './ModelStyle'
import { RightCarousel } from '../Carousel/RightCarousel'
import { LoginPage } from '../LoginSignup/LoginPage'

export const Home = () => {
    const [page,setPage] = useState(1) 
    const [query,setQuery] = useState("")
    const [photo,setPhoto] = useState([]) //storing photos in array
    const [loading,setLoading] = useState(false) //
    const [currentImage,setCurrenetImage] = useState(null)
    const [show,setShow] = useState(false)
    const [scroll,setscroll] = useState(true)


    useEffect(()=>{
        fetchPhotos(page,query)
        // console.log(scroll);
        if(scroll===true){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'unset';
        }
    },[page,query,scroll])

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
                    return [...oldPhoto,...data]
                }
            })
            setLoading(false)
        }).catch((err)=>{
            setLoading(false)
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
        // console.log(item.urls);
    setCurrenetImage(item.urls.raw)   
    }
    const handleSearch = (payload)=>{
        setQuery(payload)
        setPage(1)
    }
    const handleSign=(value)=>{
        setShow(value)
        setscroll(value)
        console.log(value,"value");
    }
    const handleLogout=(value)=>{
        setShow(value)
        setscroll(value)
        console.log(value,"logout");
    }
    return (
        <Cont>
            <LoginPage show={show} handleSign={handleSign} />
            <Modal isOpen={!!currentImage} onRequestClose={()=>setCurrenetImage(null)} style={customStyles}>
            <ModelImage src={currentImage} alt="Sorry"/>
            </Modal>
            

            <Search handleSearch={handleSearch} handleLogout={handleLogout}/>
            <RightCarousel className="carousel"/>
            <div className="grid js-grid hover14 column">
            {(photo&&(
                photo.map((item,i)=>(
                    <div key={i} onClick={()=>openModel(item)} className="item">
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
const Cont = styled.div`
    width:100%;
    margin:2rem auto;
    & .grid{
        display: grid;
        /* grid-template-columns: auto auto auto auto; */
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 35px;
    }
`



