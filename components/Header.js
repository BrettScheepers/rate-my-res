import Image from 'next/image'

const Header = () => {
    return (
        <header>
            <Image
                src="/assets/logos/LogoBlue.svg"
                alt="logo"
                width={233}
                height={34}
            />
        </header>
    )
}

export default Header
