import './App.scss';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Cart from "./pages/Cart/Cart";
import Page404 from "./pages/Page404/Page404";
import Category from "./pages/Category/Category";
import ProductDescription from "./pages/ProductDescription/ProductDescription";

function App() {
  return (
    <div className="App">
        <Router>
            <Header />
            <Routes>
                <Route path="/categories/:category" element={<Category />} />
                <Route path="/product/:id" element={<ProductDescription />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
