import React from 'react';
import { Link, useNavigate, useParams, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { Message } from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { RootState } from '../store';
import { ICartState } from '../constans/cartConstans';

export function CartScreen() {
    
    let navigate = useNavigate();
    let { id } = useParams();

    //получение количества элементов
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const qty: Number | null = Number(query.get('qty'));
    

    const dispatch = useDispatch();
    const cart = useSelector<RootState, ICartState>(state => state.cart);
    const { cartItems } = cart;

    React.useEffect(() => {
        if(id) {
            dispatch<any>(addToCart(id, qty));
        } 
    }, [dispatch, id, qty])

    const removeFromCartHandler = (id:string) => {
        dispatch<any>(removeFromCart(id));
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    
    
    return (
        <Row>
            <Col md = {8}>
                <h1>Shopping Cart</h1>
                { cartItems.length === 0 ? (
                        <Message variant = "info">
                            Your cart is empty <Link to = '/' >Go back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant = 'flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key = {item.product._id}>
                                    <Row>
                                        <Col md = {2}>
                                            <Image src = {item.product.image} alt = {item.product.name} fluid rounded/>
                                        </Col>
                                        <Col md = {3}>
                                            <Link to = {`/product/${item.product._id}`}>{item.product.name}</Link>
                                        </Col>

                                        <Col md = {3}>
                                            ${item.product.price}
                                        </Col>

                                        <Col md = {3}>
                                            <Form.Select
                                                value = {item.qty}
                                                onChange = {(e) => dispatch<any>(addToCart(item.product._id, Number(e.target.value)))}
                                            >
                                                {
                                                    [...Array(item.product.countInStock).keys()].map((x) => (
                                                        <option key = {x + 1} value = {x+1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Select>
                                        </Col>

                                        <Col md = {1}>
                                            <Button 
                                                type = 'button' 
                                                variant = 'light'
                                                onClick={() => removeFromCartHandler(item.product._id)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )
                }
            </Col>

            <Col md = {4}>
                <Card>
                    <ListGroup variant = "flush">
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0).toFixed(2)}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <div className="d-grid gap-2">
                                <Button
                                    type = 'button'
                                    variant = 'primary'
                                    disabled = {cartItems.length === 0}
                                    onClick = {checkoutHandler}
                                >
                                    Proceed to Checkout
                                </Button>
                            </div>
                            
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}