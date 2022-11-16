import React from 'react';
import { Card } from 'react-bootstrap';
import { Rating } from './Rating';
import { Link } from 'react-router-dom';

interface IProductProps {
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

export function Product( props: IProductProps) {
    
    const { _id, 
            name, 
            image, 
            description,
            brand, 
            category, 
            price, 
            countInStock, 
            rating, 
            numReviews } = props;
    
    return (
        <Card className = "my-3 p-3 rounded">
           <Link to = {`/product/${_id}`}>
                <Card.Img src = {image}/>
           </Link>
           <Card.Body>
                <Link to = {`/product/${_id}`}>
                    <Card.Title as="div">
                        <strong> {name} </strong>
                    </Card.Title> 
                </Link>
                <Card.Text as="div">
                    <div className = "my-3">
                        
                        <Rating value = {rating} text ={`${numReviews} reviews`} color = {'#f8e825'} />
                    </div>
                </Card.Text>

                <Card.Text as="h3">
                    ${price}
                </Card.Text>
           </Card.Body>
        </Card>
    )
}