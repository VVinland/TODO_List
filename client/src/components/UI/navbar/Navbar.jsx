import { useContext } from 'react';
import { Context } from '../../..';
import './navbar.css';
import MyButton from '../button/MyButton.jsx';


const Navbar = () => {

    const {user} = useContext(Context);
    
    const logout = ()=>{
        localStorage.removeItem('token');  
        user.setIsAuth(false);
    }

    return ( 
        <nav>
            <MyButton onClick={logout}>Выйти</MyButton>
        </nav>
     );
}
 
export default Navbar;