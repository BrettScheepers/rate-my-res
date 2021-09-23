import React from 'react'
import Image from 'next/image'
const logo = require("../public/assets/logos/LogoWhite.svg")

const Footer = () => {
    return (
        <footer>
            <Image 
                src={logo}
                alt="logo"
                width={233}
                height={34}
            />

            <p>All of the images used belong to their respective owners.</p>

            <p>CopyRight @Brett Scheepers 2021</p>
        </footer>
    )
}

export default Footer
