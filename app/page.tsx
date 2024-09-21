"use client";
import React, { useEffect, useState } from "react";
interface Post {
  id: number;
  body: string;
  title: string; // Add other properties if needed
}


export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch('https://jsonplaceholder.typicode.com/posts');
      let data = await res.json();
      setPosts(data);
    };

    fetchData();
  }, []);
  function Delete(post) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'DELETE',
      })
      .then(() => {
        // Filter out the deleted post
        const updatedPosts = posts.filter(p => p.id !== post.id);
        
        // Update state with the new array
        setPosts(updatedPosts);
  
        // Debugging alerts
      })
      .catch(err => console.error("Error deleting post:", err));
    }
  
  
  return (
    <div className="m-10">
      <div>Total Posts: {posts.length}</div>
      <div className="mt-10">Summary of posts:</div>
      {posts.map((post) => (
        post.id < 10?
        <div className="m-10" key={post.id}>
          {post.body}
          <div>
          <button onClick={()=>Delete(post)} className="m-3 bg-slate-800 p-1"> Delete</button>
          </div>
        </div>: <div></div>
      ))}
      <button onClick={() =>console.log("Work pending")} className="md-10 rounded-md  text-black p-5 bg-white border-red-200">Create New Post</button>
    </div>
  );
}
