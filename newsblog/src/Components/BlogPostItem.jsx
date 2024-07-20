import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BlogPostItem = ({ post, index }) => {
  return (
    <div className="col-md-4 mb-4">
      <Card className="h-100">
        <Card.Body className="d-flex flex-column">
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.description}</Card.Text> 
          <small className="text-muted mb-4">Published: {new Date(post.publishedAt).toLocaleDateString()}</small>
          <Button variant="primary" as={Link} to={`/post/${index}`} className="mt-auto">Read More</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BlogPostItem;
