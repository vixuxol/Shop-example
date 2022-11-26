import React, { FormEvent, useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

import { login } from '../actions/userActions';

import { FormContainer } from '../components/FormContainer';
import { convertCompilerOptionsFromJson } from 'typescript';

import { RootState } from '../store';
import { IUserState } from '../constans/userConstans';


export function LoginScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const dispatch = useDispatch();
    
    let { search } = useLocation();
    let navigate = useNavigate();
    // const query = new URLSearchParams(search);

    const redirect = search ? search.split('=')[1] : '/';

    const userLogin = useSelector<RootState, IUserState>(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if(userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        dispatch<any>(login(username, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant = "danger">{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='username'>
                    <Form.Label>UserName</Form.Label>
                    <Form.Control
                        placeholder='Enter username'
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type = 'password'
                        placeholder='Enter Password'
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>


                <Button type="submit" variant="primary" className = "my-3">Sign In</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : "/registre"}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}