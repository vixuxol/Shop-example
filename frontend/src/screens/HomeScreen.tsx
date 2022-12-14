import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../components/Product';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { listProducts } from '../actions/productListActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { IProductListState } from '../constans/productListConstans';


export function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector<RootState, IProductListState>(state => state.productList);
    const {error, loading, products} = productList;
    
    React.useEffect(() => {
        //@ts-ignore
        dispatch(listProducts())
    }, [dispatch]);

    /* Sm - тип маленький экран */
    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? <Loader />
                    : error ? <Message  variant = 'danger'>{error}</Message>
                        :
                        <Row>
                            {products.map(product => (
                                <Col key = {product._id} sm = {12} md = {6} lg = {4} xl ={3}>
                                    <Product {...product} />
                                </Col>
                            ))}
                        </Row>
            }
        </div>
    )
}