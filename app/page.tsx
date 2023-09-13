import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PostFlow from '@/components/PostFlow'
import savedPosts from '@/data/posts'

const getPosts = async () => {
  return savedPosts
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className='flex flex-col'>
      <Header />
      <PostFlow defaultPosts={[...posts, ...posts]} />
      <Footer />
    </main>
  )
}
