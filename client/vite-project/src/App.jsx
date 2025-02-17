import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Adminlogin from './Admin/Adminlogin';
import Dashboard from './Admin/Dashboard';
import AddBook from './Admin/AddBook';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import BookDetail from './Components/BookDetail';

function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
     <Route path="/" element={<Signup/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/home" element={<Home/>}/>
      <Route path="/adminlogin" element={<Adminlogin/>}/>
      <Route path="/admin/dashboard" element={<Dashboard/>}/>
      <Route path="/addbook" element={<AddBook/>}/>
      <Route path="/book/:id" element={<BookDetail></BookDetail>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
