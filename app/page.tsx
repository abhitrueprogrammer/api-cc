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

  return (
    <div className="m-10">
      <div>Total Posts: {posts.length}</div>
      
      {posts.map((post) => (
        post.id < 10?
        <div className="m-10" key={post.id}>
          {post.body}
        </div>: <div></div>
      ))}
    </div>
  );
}
