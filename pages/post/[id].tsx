import {useState, useEffect} from 'react'
import {MainLayout} from '../../components/MainLayout';
import Link from 'next/link'
import {useRouter} from 'next/router';
import {IMyPost} from '../../interfaces/post';
import {NextPageContext} from 'next';

interface IPostPageProps {
    post: IMyPost
}

export default function Post({post: serverPost}: IPostPageProps) {
    const [post, setPost] = useState(serverPost)
    const router = useRouter()

    useEffect(() => {
        async function load() {
            const res = await fetch(`${process.env.API_URL}/posts/${router.query.id}`)
            const data = await res.json()
            setPost(data)
        }

        if (!serverPost) {
            load()
        }
    }, [])

    if (!post) {
        return <MainLayout>
            <p>Loading ...</p>
        </MainLayout>
    }

    return (
        <MainLayout title={'Post'}>
            <h1>{post.title}</h1>
            <hr/>
            <p>{post.body}</p>
            <Link href={'/posts'}><a>Back to all posts</a></Link>
        </MainLayout>
    )
}

interface IPostNextPageContext extends NextPageContext {
    query: {
        id: string
    }
}

Post.getInitialProps = async ({query, req}: IPostNextPageContext) => {
    if (!req) {
        return {post: null}
    }
    const res = await fetch(`http://localhost:4200/posts/${query.id}`)
    const post: IMyPost = await res.json()

    return {
        post
    }
}

// export async function getServerSideProps({query, req}) {
//     const res = await fetch(`http://localhost:4200/posts/${query.id}`)
//     const post = await res.json()
//     return {
//         props: {post}, // will be passed to the page component as props
//     }
// }
