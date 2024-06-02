import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import AddProduct from './components/AddProduct';
import Signup from './components/Signup';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Update from './components/Update';
import PrivateComponent from './components/PrivateComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element = {<PrivateComponent />}>
        <Route path='/' element={<ProductList />} />
        <Route path='/add' element={<AddProduct />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/logout' element={<Signup />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
