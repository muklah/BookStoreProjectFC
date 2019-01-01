import React from 'react';
import styels from './Navbar.module.css';
import Logo from './Logo/Logo';
import Container from '../../UI/Container/Container';
import User from './User/User';
import { Store } from '../../store';
class Navbar extends React.Component{
    static contextType = Store;    
    render(){
        const {user,logOut} = this.context;
        return (
            <div className={styels.navbar}>
            <Container>
               <div className={styels.navbarContent}>
                <Logo/>
                <User user={user} logOut={logOut} />
               </div>
            </Container>
           
            </div>
        );
    }
}

export default Navbar;