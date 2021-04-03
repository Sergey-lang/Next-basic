import {MainLayout} from '../components/MainLayout';
import {useEffect, useState} from 'react'
import Link from 'next/link'
import {IMyPost} from '../interfaces/post';
import {NextPageContext} from 'next';

interface IPostsPageProps {
    posts: IMyPost[]
}

export default function Posts({posts: serverPosts}: IPostsPageProps) {
    const [posts, setPosts] = useState(serverPosts)

    useEffect(() => {
        async function load() {
            const res = await fetch(`${process.env.API_URL}/posts`)
            const json = await res.json()
            setPosts(json)
        }

        if (!serverPosts) {
            load()
        }
    }, [])

    if (!posts) {
        return <MainLayout>
            <p>Loading ...</p>
        </MainLayout>
    }

    return (
        <MainLayout title={'Posts Page'}>
            <h1>Posts Page</h1>
            <ul>
                {
                    posts.map(p => (
                        <li key={p.id}>
                            <Link href={`/post/[id]`} as={`/post/${p.id}`}>
                                <a>{p.title}</a>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </MainLayout>
    )
}

Posts.getInitialProps = async ({req}: NextPageContext) => {
    if (!req) {
        return {posts: null}
    }
    const res = await fetch('http://localhost:4200/posts')
    const posts: IMyPost[] = await res.json()

    return {
        posts
    }
}
