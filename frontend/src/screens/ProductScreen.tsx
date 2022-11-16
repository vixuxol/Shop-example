import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import { Rating } from '../components/Rating';

import { listProductDetails } from '../actions/productDetailsActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { IProductDetailsState } from '../constans/productDetailsConstant';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';


export function ProductScreen() {
    let { id } = useParams();

    const dispatch = useDispatch();
    const productDetails = useSelector<RootState, IProductDetailsState>(state => state.productDetails);
    const {error, loading, product} = productDetails;
    
    React.useEffect(() => {
        if (id) {
            dispatch<any>(listProductDetails(id))
        }
    }, [dispatch, id]);

    return (

        <div>
            <Link to = '/' className = 'btn btn-light my-3'>Go back</Link>
            {loading ? <Loader />
                    : error ? <Message  variant = 'danger'>{error}</Message>
                        :
                        <Row>
                            <Col md = {6}>
                                <Image src = {product.image} alt = {product.name} fluid />
                            </Col>

                            <Col md = {3}>
                                <ListGroup variant = "flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Rating value = {product.rating} text ={`${product.numReviews} reviews`} color = {'#f8e825'} />
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>

                            <Col md = {3}>
                                <Card>
                                <ListGroup variant = "flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock': 'Out of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                        <div className="d-grid gap-0">
                                            <Button variant="primary" size="lg" disabled = {product.countInStock === 0} type = 'button'>
                                                Add to Cart
                                            </Button>
                                        </div>
                                            
                                        </ListGroup.Item>
                                    </ListGroup> 
                                </Card>
                            </Col>
                        </Row>
            }  
        </div>
    )
}