import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import { useMediaQuery } from 'react-responsive';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Slider = () => {
  const sm = useMediaQuery({ maxWidth: 991 });

  return (
    <>
      {!sm && (
        <AutoplaySlider
          style={{ width: '100vw', height: '70vh', objectFit: 'cover' }}
          startup
          className="aws-btn"
          play={true}
          interval={3000}
        >
          <div data-src="/Casual.png" />
          <div data-src="/Casualtwo.png" />
          <div data-src="/fashion.png" />
          <div data-src="/shoes.png" />
          <div data-src="/Special.png" />
          <div data-src="/watches.png" />
        </AutoplaySlider>
      )}
    </>
  );
};

export default Slider;
