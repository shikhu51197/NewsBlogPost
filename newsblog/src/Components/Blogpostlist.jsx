import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import BlogPostItem from "./BlogPostItem";

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=javascript&apiKey=5b1d69f93be74948a61cd3034e7a8ae4&page=${currentPage}&pageSize=6`
        );
        setPosts(response.data.articles);
        setTotalPages(Math.ceil(response.data.totalResults / 6));
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-10 text-center">Blog Posts</h1>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-around mt-4 mb-4">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
          <div className="row">
            {posts.map((post, index) => (
              <BlogPostItem key={index} post={post} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogPostList;
