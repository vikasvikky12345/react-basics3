import React,{useState,useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useDispatch} from 'react-redux';
import { add } from '../Store/CartSlice';
function Product() {
    const dispatch = useDispatch()
    const [products,getProducts] = useState([]);
    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
        .then(data=>data.json())
        .then(res=>getProducts(res))
    },[])
    const addToCart = (product)=>{
        dispatch(add(product))
    }
    const cards = products.map(product => (
        <div className='col-md-3' style={{ margin: '15px' }}>
          <Card className='h-100' key={product.id}>
            <div className='text-center'>
              <Card.Img variant='top' src={product.image} style={{ width: '100px', height: '130px' }} />
            </div>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                INR: {product.price}
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ background: 'white' }}>
              <Button variant='primary' onClick={()=>addToCart(product)}>ADD To Cart</Button>
            </Card.Footer>
          </Card>
        </div>
      ));      
  return (
    <div>
        <h1>Product Dashboard</h1>
        <div className='row'>
            {cards}
        </div>
    </div>
  )
}

export default Product