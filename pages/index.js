
import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const PostLink = (props) => (
    <li>
        <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
            <a>{props.title}</a>
        </Link>
    </li>
)


const BlogLinks = () => (
    <Layout>
        <h1>My Blog</h1>
        <ul>
            <PostLink id="hello-nextjs" title="Hello Next.js"/>
            <PostLink id="learn-next" title="Learn Next.js"/>
            <PostLink id = "deploy-app" title="Deploy App"/>
        </ul>
    </Layout>
)


const Index = (props) => (
    <Layout>
        <h1>Batman TV Shows</h1>
        <ul>
            {
                props.shows.map(({show}) => (
                    <li key={show.id}>
                        <Link as={`/s/${show.id}`} href={`/show?id=${show.id}`}>
                        <a>{show.name}</a>
                        </Link>
                    </li>        
                ))
            }
        </ul>
    </Layout>
)

Index.getInitialProps = async function() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()

    console.log(`Show Data fetched. Count: ${data.length}`)

    return {
        shows: data
    }
}

export default Index