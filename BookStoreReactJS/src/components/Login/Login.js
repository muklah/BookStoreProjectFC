import React, { Component } from 'react';
import {Link , Redirect} from 'react-router-dom';
import {Formik} from 'formik'
import { Store } from '../../store';

import { string, object } from 'yup';
import styles from './Login.module.css';
import {
    Form, Icon, Input, Button,
  } from 'antd';
class Login extends Component {
    static contextType = Store;    
    render() {
        const {saveUser,user} = this.context; 
        return (
          <div>
          {
          user.login ? <Redirect to="/"/> :
          <Formik
            // Sets up our default values
            initialValues={{ email: "muklah@user.me", password: "12345" }}
            
            // Validates our data
            validationSchema={object().shape({
              email:string().email().required(),
              password:string().min(5).required()
            })}
            // Handles our submission
            onSubmit={(values, { setSubmitting , resetForm}) => {
              // This is where you could wire up axios or superagent
              setSubmitting(true);
              fetch('http://172.104.149.151:2000/api/users/login',{
                method: "POST",
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body:JSON.stringify(values)
              }).catch(err => {
                console.log(err.failed);
                
              })
              .then((response) => {
                if(response.status === 200){
                return  response.json();
                }else{
                let err = response.json();
                console.log(err);
                alert(err.failed)
                setSubmitting(false);
                localStorage.removeItem("user");
                saveUser({user:{}})
                }
                }).then(data =>{
                console.log(data);
                const user ={
                  login:true,
                  type:data.type
                }
                localStorage.setItem("user",JSON.stringify(user));
                saveUser({user})
                setSubmitting(false);
                resetForm();
              })
              
            }}
          >
          
        { ({
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting
        }) => (
            <Form className={styles.form} onSubmit={handleSubmit}>
                  <h1>Login</h1>
                <Form.Item
                  label="email"
                  validateStatus={touched.email && errors.email && "error"}
                  help={touched.email && errors.email && errors.email}
                >
                    <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" name="email" value={values.email} onChange={handleChange}/>
                </Form.Item>
                <Form.Item
                  label="password"
                  validateStatus={touched.password && errors.password && "error"}
                  help={touched.password && errors.password && errors.password}
                >
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange}/>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" block htmlType="submit" className="login-form-button" loading={isSubmitting}>
                    Log in
                  </Button>
                </Form.Item>
                <Form.Item>
                  Or <Link to="/register">Register</Link>
                </Form.Item>
              </Form>
          )}


        </Formik>
            }
          </div>
          );
    }
} 
export default Login;


