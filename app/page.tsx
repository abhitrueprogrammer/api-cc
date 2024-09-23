//Use Axios here
"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
interface Post {
  id: number;
  body: string;
  title: string; // Add other properties if needed
}
;
const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  baseURL: "https://jsonplaceholder.typicode.com/",
})
export default function Home() {
  const [isLoading, setIsLoading]= useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try{
        setIsLoading(true)
        const res = await api.get<Post[]>("/posts");
        setPosts(res.data);
      }
      catch(error){
        throw error;
      }
      finally{
        setIsLoading(false);

      }
    };

    fetchData();
  }, []);

  const router = useRouter();
  const newPost = () =>{
    router.push('/new')
  }
  async function Delete(post: Post) {
      try
      {
        await api.delete(`/posts/${post.id}`);
        const updatedPosts = posts.filter((p) => p.id !== post.id);
              setPosts(updatedPosts);

      }
      catch(error)
      {
        throw error
      }
      // fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.id}`, {
      //   method: 'DELETE',
      // })
      // .then(() => {
      //   // Filter out the deleted post
      //   const updatedPosts = posts.filter((p: Post) => p.id !== post.id);
        
      //   // Update state with the new array
      //   setPosts(updatedPosts);
  
      //   // Debugging alerts
      // })
      // .catch(err => console.error("Error deleting post:", err));
    }

  if(isLoading)
  {
  }

  return (

    <div className="m-10">
      <div>Total Posts: {posts.length}</div>
      <div className="mt-10">Summary of posts:</div>
      
      {isLoading? (
             <div className='m-10'>Loading...</div>):<div>      
             {posts.map((post: Post) => (
              post.id < 10?
              <div className="m-10" key={post.id}>
                {post.body}
                <div>
                <button onClick={() => {Delete(post)}} className="m-3 bg-slate-800 p-1"> Delete</button>
                </div>
              </div>: <div></div>
            ))}</div>
      }
      
      <button onClick={()=> newPost()} className="md-10 rounded-md  text-black p-5 bg-white border-red-200">Create New Post</button>
     
    </div>
    
  );
}
