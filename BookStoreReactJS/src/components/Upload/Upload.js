import React, { Component } from 'react';
import {Link , Redirect} from 'react-router-dom';
import {Formik} from 'formik'
import { Store } from '../../store';

import { string, object , mixed} from 'yup';
import styles from './Upload.module.css';
import {
    Form, Icon, Input, Button
  } from 'antd';
class Upload extends Component {
    static contextType = Store;    
    render() {
        const {user} = this.context; 
        return (
          <div>
            {
              user.login && user.type == 'admin' ?
              <Formik
            // Sets up our default values
            initialValues={{ title: "", author: "" ,pdf:null , image:null}}
            
            // Validates our data
            validationSchema={object().shape({
              title:string().required(),
              author:string().min(5).required(),
              pdf:mixed().required(),
              image:mixed().required(),
             
            })}
            // Handles our submission
            onSubmit={({title,author,pdf,image}, { setSubmitting , resetForm}) => {
              // This is where you could wire up axios or superagent
              setSubmitting(true);
              const formData = new FormData();
              formData.append('pdf',pdf);
              formData.append('image',image);
              formData.append('title',title);
              formData.append('author',author);
              
              fetch('http://172.104.149.151:2000/api/books/add',{
                method: "POST",
                body:formData
              })
              .then(response => {
                if(response.status === 200){
                  setSubmitting(false);
                  resetForm()
                }else{
                  alert('Something wrong')
                  setSubmitting(false);
                  
                }
              }
              )
              
            }}
          >
          
        { ({
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting
        }) => (
            <Form className={styles.form} onSubmit={handleSubmit}>
                  <h1>Upload</h1>
                  
                <Form.Item
                  label="Title"
                  validateStatus={touched.title && errors.title && "error"}
                  help={touched.title && errors.title && errors.title}
                >
                    <Input prefix={<Icon type="text" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Title" name="title" value={values.title} onChange={handleChange}/>
                </Form.Item>
                
                <Form.Item
                  label="Author"
                  validateStatus={touched.author && errors.author && "error"}
                  help={touched.author && errors.author && errors.author}
                >
                    <Input prefix={<Icon type="text" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Title" name="author" value={values.author} onChange={handleChange}/>
                </Form.Item>
                
                <Form.Item
                    label="Book file"
                    help={touched.pdf && errors.pdf && errors.pdf}
                    validateStatus={touched.pdf && errors.pdf && "error"}
                    >
                      <input type="file" name="pdf"  onChange={(e) =>{
                        setFieldValue("pdf", e.target.files[0]);
                      }} /> 
                    </Form.Item>
                
                <Form.Item
                    label="Book image"
                    help={touched.image && errors.image && errors.image}
                    validateStatus={touched.image && errors.image && "error"}
                    >
                        <input type="file" name="image" onChange={(e) =>{
                          setFieldValue("image", e.target.files[0]);
                        }} />
                    
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" block htmlType="submit" className="login-form-button" loading={isSubmitting}>
                        Upload
                      </Button>
                    </Form.Item>
                
              </Form>
          )}


         </Formik>
         :
         <Redirect to="/"/>
            }
          </div>
          );
    }
} 
export default Upload;


