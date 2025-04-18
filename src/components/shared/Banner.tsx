import React from 'react';

interface Props {
    image: string;
    title: string;
    subtitle: string;
};

const Banner = ({ image, title, subtitle }: Props) => {
    return (
        <div className="flex justify-center items-center"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "350px",
                width: "100%",
            }}>
            <div className="w-3xl mx-auto text-center z-50">
                <h2 className="text-2xl md:text-4xl font-bold text-white">
                    {title}
                </h2>
                <p className="mt-2 text-white">{subtitle}</p>
            </div>
        </div>
    );
};

export default Banner;