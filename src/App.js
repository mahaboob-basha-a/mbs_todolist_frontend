import {Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
function App() {
    return (<> 
        <Routes>
            <Route exact path='/' Component={Home} />
            <Route exact path='/login' Component={Login} />
            <Route exact path='/register' Component={Register} />
        </Routes>
    </>);
}

export default App;