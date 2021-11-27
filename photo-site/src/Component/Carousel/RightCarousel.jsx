import React from "react";
import CarouselSlider from "react-carousel-slider";
let autoSliding = {
  items: [
    {
      id:1,
      imgSrc:
        "https://images.unsplash.com/photo-1456926631375-92c8ce872def?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      id:2,
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE81rT99UZWXlX_GS2RztoFMK8cDf2hqleQ&usqp=CAU",
    },
    {
      id:3,
      imgSrc:
        "https://blog-digital.aakash.ac.in/wp-content/uploads/2018/10/online-education-1140x570.png",
    },
    {id:4,
      imgSrc:
        "https://www.cicnews.com/wp-content/uploads/2020/04/20200408onlinestudy.jpg",
    },
  ],
};

export const RightCarousel = () => {
  let manner = {
    autoSliding: { interval: "4s" },
    duration: "2s",
  };
  let sliderBoxStyle = {
    height: "200px",
    width: "700px",
    background: "transparent",
    // border:"1px solid red"
  };
  let itemsStyle = {
    width: "100%",
    objectFit:"cover"
    // height:"20%",
  };
  let accEleSetting;

  let mobileRegx = /Mobi/;
  if (mobileRegx.test(navigator.userAgent)) {
    accEleSetting.button = false;
  }

  let buttonSetting = {
    placeOn: "middle-inside",
    hoverEvent: true,
    style: {
      left: {
        height: "0px",
        width: "0px",
        color: "#929393",
        background: "rgba(225, 228, 232, 0.8)",
        borderRadius: "50%",
      },
      right: {
        height: "0px",
        width: "0px",
        color: "#929393",
        background: "rgba(225, 228, 232, 0.8)",
        borderRadius: "50%",
      },
    },
  };

  const typeSearch=(e)=>{
    console.log(e.target);
  }
  return (
    <div onClick={(e)=>(typeSearch(e))}>
    <CarouselSlider
      slideItems={autoSliding.items}
      manner={manner}
      buttonSetting={buttonSetting}
      sliderBoxStyle={sliderBoxStyle}
      itemsStyle={itemsStyle}
    />
    </div>
  );
};
