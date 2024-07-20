import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Spinner } from "react-bootstrap";


const BlogPostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://newsapi.org/v2/everything?q=javascript&apiKey=5b1d69f93be74948a61cd3034e7a8ae4');
        setPost(response.data.articles[id]);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="text-center  mt-5"><Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;</div>
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="container my-5">
      <div className="text-left mb-3">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          Back To Home
        </Button>
      </div>

      <div className="text-center">
        <h1 className="mb-4">Blog Post Details</h1>
      </div>

      <Card className="mx-auto" style={{ maxWidth: "700px" }}>
        <Card.Body>
          <Card.Title className="mt-4">{post.title}</Card.Title>
          {post.urlToImage && (
            <Card.Img
              variant="top"
              src={post.urlToImage}
              className="mb-4"
              style={{ objectFit: "cover", maxHeight: "300px" }}
              alt={post.title}
            />
          )}
          <Card.Text>
            <b>Content:</b> {post.content}
          </Card.Text>
          <Card.Text>
            <b>Published at:</b>{" "}
            {new Date(post.publishedAt).toLocaleString()}
          </Card.Text>
          <Card.Text>
            <b>Author:</b> {post.author}
          </Card.Text>
          <Card.Text>
            <b>Description:</b> {post.description}
          </Card.Text>
          <Button
            variant="primary"
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="d-block mx-auto mt-3"
  style={{ maxWidth: "200px" }}
          >
            Read full article
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BlogPostDetails;