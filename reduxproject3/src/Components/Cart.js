import React from 'react';
import Card from 'react-bootstrap/Card';
import {useSelector,useDispatch} from 'react-redux';
import Button from 'react-bootstrap/Button'
import { remove } from '../Store/CartSlice';
function Cart() {
    const dispatch = useDispatch()
    const products = useSelector(state=>state.cart)
    const removeFromCart = (id)=>{
        dispatch(remove(id))
    }
    const cards = products.map(product => (
        <div className='col-md-12' style={{ margin: '10px' }}>
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
              <Button variant='danger' onClick={()=>removeFromCart(product.id)}>Remove Item</Button>
            </Card.Footer>
          </Card>
        </div>
    ))
      return(
        <>
        <div className='row'>
            {cards}
        </div>
        </>
      )
}

export default Cart