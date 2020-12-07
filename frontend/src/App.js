import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import PaymentScreen from './screens/PaymentScreen';
import CartScreen from './screens/CartScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import UserEditScreen from './screens/UserEditScreen';

import OrderListScreen from './screens/OrderListScreen';

import AdminOrderScreen from './screens/AdminOrderScreen';

import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />

          <Route path="/search/:keyword" component={HomeScreen} />

          <Route path="/product/:id" component={ProductScreen} />

          {/* ? for optional */}
          <Route path="/cart/:id?" component={CartScreen} />
          {/* <Route path="/cart/:id?/:qty?" component={CartScreen} /> */}

          <Route path="/login" component={LoginScreen} />

          <Route path="/register" component={RegisterScreen} />

          <Route path="/profile" component={ProfileScreen} />

          <Route path="/shipping" component={ShippingScreen} />

          <Route path="/payment" component={PaymentScreen} />

          <Route path="/placeorder" component={PlaceOrderScreen} />

          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />

          <Route path="/admin/productlist" component={ProductListScreen} />

          <Route path="/admin/orderlist" component={OrderListScreen} />

          <Route path="/admin/product/:id" component={ProductEditScreen} />

          <Route path="/admin/createproduct" component={ProductCreateScreen} />

          <Route exact path="/admin/user/:id/edit" component={UserEditScreen} />

          <Route
            exact
            path="/admin/order/:id/edit"
            component={AdminOrderScreen}
          />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
