import { pool } from '../../database/db'

export const getStaticPaths = async () => {
    const res = await pool.query('SELECT * FROM universities')
    const data = await res.rows

    const paths = data.map(uni => {
        return {
            params: { slug: uni.uni_slug }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const slug = context.params.slug
    const res = await pool.query('SELECT * FROM universities WHERE uni_slug = $1', [slug])
    const data = await res.rows[0]

    return {
        props: { university: data }
    }
}

const University = ({ university }) => {
    const { uni_id: id, uni_name: name, uni_slug: slug} = university

    return (
        <div className="university-page">
            <h1>{name}</h1>
        </div>
    )
}

export default University
