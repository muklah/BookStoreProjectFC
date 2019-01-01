import React from 'react';
import {Dropdown, Icon, Menu} from 'antd';
import {Link} from 'react-router-dom'

const User = ({user , logOut}) => {
    const menu = (
        <div>
          {!user.login ? (
            <Menu>
              <Menu.Item key="0">
              <Link to="login">Login</Link>
              </Menu.Item>
              <Menu.Item key="1">
              <Link to="/register">Register</Link>
              </Menu.Item>
            </Menu>
          ) : (
            <Menu>
            {
                user.type === 'admin' && (
                    <Menu.Item key="3" >
                    <Link to="/upload">Upload</Link>
                    </Menu.Item>
                )
            }
            <Menu.Divider />
            <Menu.Item onClick={()=> logOut()} key="4" >Log out</Menu.Item>
          </Menu>
          )
          
          }
          </div>
          
        
      );

    return (
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
                 <Icon style={{color: '#fff',fontSize:'20px'}} type="user" />
            </a>
        </Dropdown>
    );
}

export default User;