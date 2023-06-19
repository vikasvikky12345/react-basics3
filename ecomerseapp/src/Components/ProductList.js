import React from 'react';
import { Button, Container, Card } from 'react-bootstrap';

const ProductList = ({ products, addToCart }) => {
  return (
    <Container className="mt-4">
      <div className="row">
        {products.map((product, index) => (
          <div className="col-md-3" key={index}>
            <Card>
              <Card.Img variant="top" src={product.imageUrl} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ProductList;
