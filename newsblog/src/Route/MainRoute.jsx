import React from 'react'
import { Routes, Route } from 'react-router-dom';
import BlogPostList from '../Components/Blogpostlist';
import BlogPostDetails from '../Components/BlogPostDetails';

const MainRoute = () => {
  return (
    <div>
        <Routes>
        <Route path="/" element={<BlogPostList />} />
        <Route path="/post/:id" element={<BlogPostDetails />} />
      </Routes>
    </div>
  )
}

export default MainRoute
