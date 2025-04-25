import Image from 'next/image';
import React, { JSX } from 'react';
import loadingLogo from "../../assets/loading-logo.png";

const Spinner = (): JSX.Element => {
    return (
        <div className="relative w-16 h-16">
            {/* Spinning ring */}
            <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>

            {/* Static image */}
            <Image
                src={loadingLogo}
                alt="Logo"
                width={64}
                height={64}
                className="rounded-full p-2"
            />
        </div>
    );
};

export default Spinner;