import {useRouter} from 'next/router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
    const router = useRouter()

    return (
        <button className="btn-back" onClick={() => router.back()}>
            <ArrowBackIcon fontSize="large" />
            <p>Back</p>
        </button>
    )
}

export default BackButton
