import { useGetRecentPosts } from "../../lib/react-query/queries"

const Home = () => {
  const { data: post} = useGetRecentPosts();
  console.log(post)
  return (
    <div>Home</div>
    
  )
}

export default Home