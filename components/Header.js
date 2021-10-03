import Image from 'next/image'
import {useRouter} from 'next/router'

const Header = () => {
    const router = useRouter()

    return (
        <header>
            <Image
                onClick={() => router.push('/')}
                className="logo"
                src="/assets/logos/LogoBlue.svg"
                alt="logo"
                width={233}
                height={34}
            />
        </header>
    )
}

export default Header
