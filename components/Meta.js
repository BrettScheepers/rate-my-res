import Head from 'next/head'

const Meta = ({ title, keywords, description, }) => {
    return (
        <Head>
            <meta name='viewport'
                content='width=device-width, initial-scale=1'
            />
            <meta
                name='keywords'
                content={keywords}
            />
            <meta
                name='description'
                content={description}
            />
            <meta
                charSet='utf-8'
            />
            <link rel="icon" href='/assets/logos/LogoFavicon.svg' />
            <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps = {
    title: 'Rate My Res',
    keywords: 'student housing, residence, reviews',
    description: 'Find the student house that will become your next Home.'
}

export default Meta
