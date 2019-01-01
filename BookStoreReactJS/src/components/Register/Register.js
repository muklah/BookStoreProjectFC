import React, { Component } from 'react';
import {withFormik} from 'formik'
import { object , string } from 'yup'
import {Link ,Redirect} from 'react-router-dom';
import styles from './Register.module.css';
import {Form, Icon, Input, Button,} from 'antd';
import { Store } from '../../store';
class Register extends Component {
    static contextType = Store;
    render() {
        const {user} = this.context;
        const {
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,} = this.props;
        return (
            <div>
                { user.login ? <Redirect to="/" /> :
                <Form className={styles.form} onSubmit={handleSubmit}>
                <h1>Register</h1>

              <Form.Item
                 label="Username"
                 validateStatus={touched.user && errors.user && 'error'}
                 help={errors.user && errors.user}
              >
                 
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" name="user" value={values.user} onChange={handleChange}/>
              </Form.Item>

              <Form.Item
                label="Email"
                validateStatus={touched.email && errors.email && 'error'}
                help={touched.email && errors.email && errors.email}
              >
                  <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" name="email" value={values.email} onChange={handleChange}/>
              </Form.Item>

              <Form.Item
                label="Password"
                validateStatus={touched.password && errors.password && 'error'}
                help={touched.password && errors.password && errors.password}
              >
                  <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Email" name="password" value={values.password} onChange={handleChange}/>
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" block htmlType="submit" className="login-form-button">
                  Submit
                </Button>
                
              </Form.Item>
              <Form.Item>
              Or <Link to="/login">Login</Link>
              
              </Form.Item>
            </Form>
                }
            </div>
          );
    }
} 

export default withFormik({
    mapPropsToValues:({user,email,password})=>{
        return{
            user:'',
            email:'',
            password:''
        }
    },
    handleSubmit:(values,{setSubmitting})=>{
        fetch('http://172.104.149.151:2000/api/users/register',{
            method: "POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(values)
          }).then(Response =>{
            console.log('muklah',Response.status);
            if(Response.status ===200){
              setSubmitting(false);
              alert('You registerd successfuly')
            }
          })
    },
    validationSchema:object().shape({
        user:string().required().min(5),
        password:string().required().min(5),
        email:string().email().required()
    })
})(Register);