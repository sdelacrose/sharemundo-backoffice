'use client';

import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';
import React from 'react';
import { Box } from '@mui/material';
import { StaticImageData } from 'next/image';

interface CustomCarouselProps {
  images: (StaticImageData | string)[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ images = [] }) => {
  return (
    <Carousel indicators={false} navButtonsAlwaysVisible animation="slide">
      {images.map((url, index) => (
        <Box
          key={index}
          sx={{ width: '100%', height: '300px', position: 'relative' }}
        >
          <Image
            src={url}
            alt={`Screenshot ${index + 1}`}
            layout="fill"
            objectFit="fill"
            priority
          />
        </Box>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
