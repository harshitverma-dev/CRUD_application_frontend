import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Edit from './pages/Edit/Edit';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Header from './components/Headers/Header';
import { Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route exact path="/register" element={<Register />} />
				<Route exact path="/edit/:id" element={<Edit />} />
				<Route exact path="/userprofile/:id" element={<Profile />} />
			</Routes>
		</>
	);
}

export default App;
