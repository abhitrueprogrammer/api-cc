'use client';

import { useRouter } from 'next/router';
import React, { useState, useEffect} from 'react';
const FormPage: React.FC = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        let res = await fetch('https://jsonplaceholder.typicode.com/posts');
        let data = await res.json();
        setPosts(data);
      };
  
      fetchData();3
    }, []);


  
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Process the form data, e.g., send it to an API or log it
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: formData.title,
          body: formData.body,
          userId: formData.userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
  };

  return (

    <form onSubmit={handleSubmit} className='m-32'>
      <div >
        <label htmlFor="userId">User ID:</label>
        <input
          type="number"
          id="userId"
          name="userId"
          className='m-3'
          value={formData.userId}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          className='m-3'

          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className='flex align-middle'>
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          name="body"
          className='m-3'

          value={formData.body}
          onChange={handleChange}
        />
      </div>

      <button  className='mx-44 my-14' type="submit">Submit</button>
    </form>

  );
};

export default FormPage;
``