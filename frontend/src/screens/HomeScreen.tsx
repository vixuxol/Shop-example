import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../components/Product';
import axios from 'axios';

interface IProduct {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
}
export function HomeScreen() {
    
    const [products, setProducts] = React.useState<Array<IProduct>>([]);

    React.useEffect(() => {

        async function fetchProducts() {
            const { data } = await axios.get('/api/products/');
            setProducts(data);
        }

        fetchProducts();
        
    }, []);

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {/* Sm - тип маленький экран */}
                {products.map(product => (
                    <Col key = {product._id} sm = {12} md = {6} lg = {4} xl ={3}>
                        <Product {...product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}