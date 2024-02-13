import logo from './logo.svg';
import './App.css';
import CompShowBlogs from './blog/ShowBlog';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompCreateBlog from './blog/CreateBlog';
import CompEditBlog from './blog/EditBlog';
import NavBar from '../src/components/header/header.js'
import Footer from '../src/components/footer/footer.js'
import Home from './components/pages/home.jsx';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/categories' element={<CompShowBlogs />} />
          <Route path='/create' element={<CompCreateBlog />} />
          <Route path='/edit/:id' element={<CompEditBlog />} />

        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
