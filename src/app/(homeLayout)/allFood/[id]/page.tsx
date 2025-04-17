import React from 'react';
import bannerImage from "@/assets/bannerImg/aboutBanner1.jpg";
import Banner from '@/components/shared/Banner';

const FoodDetails = () => {
    return (
        <div>
            {/* banner section  */}
            <Banner image={bannerImage.src} title={'Food Details'} subtitle={'This is subtitle'} />
        </div>
    );
};

export default FoodDetails;