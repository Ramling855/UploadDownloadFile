import 'antd/dist/antd.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
  } from 'antd';
  import React, { useState } from 'react';
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 12,
      },
      sm: {
        span: 8,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  
  const Signin = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
  
    const onFinish = (values) => {
      console.log('Received values of form: ', values);

      axios
        .post("http://localhost:7000/login", values)
        .then((res) => {
            console.log(res.data)
            localStorage.setItem("user-token", res.data.token);
            if(res.data.token){

                navigate("/home")
            }else{
                alert("please Signup first")
            }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  
    return (
        <div style={{backgroundColor:"GrayText",height:"1000px"}}>
           <div style={{display:"flex" ,alignContent:"center",alignItems:"center",color:"blueviolet"}}>
           <h1 style={{color:"yellow",marginLeft:"30%"}} >Login Form</h1>

           </div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >

        <Form.Item
       
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
  
  
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
  };
  
  export default Signin;