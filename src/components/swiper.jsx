import React, { useEffect, useRef } from 'react';
import "./swiper.css"

const CustomSwiper = ({ images }) => {
  const swiperWrapperRef = useRef(null);
  const totalWidthRef = useRef(0);
  const currentPositionRef = useRef(0);

  useEffect(() => {
    const swiperWrapper = swiperWrapperRef.current;
    const imagesArray = Array.from(swiperWrapper.children);

    totalWidthRef.current = imagesArray.reduce((acc, img) => acc + img.offsetWidth + 50, 0) / 2; // divide by 2 because we duplicate the images

    const slide = () => {
      currentPositionRef.current -= 0.8;
      swiperWrapper.style.transform = `translateX(${currentPositionRef.current}px)`;

      if (Math.abs(currentPositionRef.current) >= totalWidthRef.current) {
        const firstChild = swiperWrapper.firstChild;
        swiperWrapper.appendChild(firstChild);
        swiperWrapper.style.transition = 'none';
        swiperWrapper.style.transform = `translateX(0px)`;
        currentPositionRef.current = 0;
        setTimeout(() => {
          swiperWrapper.style.transition = 'transform 0.01s linear';
        }, 0);
      }

      requestAnimationFrame(slide);
    };

    const animationId = requestAnimationFrame(slide);

    return () => cancelAnimationFrame(animationId);
  }, []);

  let duplicatedImages = images;
  for (let i = 0; i < 199; i++) { 
    duplicatedImages = duplicatedImages.concat(images);
  }

  return (
    <div className="swiperContainer">
      <div className="swiperWrapper" ref={swiperWrapperRef} style={{ width: `${duplicatedImages.length * 100}%` }}>
        {duplicatedImages.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt="" />
        ))}
      </div>
    </div>
  );
};

export default CustomSwiper;