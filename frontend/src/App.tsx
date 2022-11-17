import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Container } from 'react-bootstrap';

import { HomeScreen } from './screens/HomeScreen';
import { ProductScreen } from './screens/ProductScreen';
import { CartScreen } from './screens/CartScreen';


function App() {
  //? вопрос в параметре - необязательный параметр
  return (
    <Router>
      <Header />
      <main className = "py-3">
          <Container>
            <Routes>
              <Route path='/' element = {<HomeScreen />} />
              <Route path='/product/:id' element = {<ProductScreen />} />
              <Route path='/cart'>
                <Route path = '' element = {<CartScreen />} />
                <Route path = ':id' element = {<CartScreen />} />
              </Route> 
            </Routes>
          </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
