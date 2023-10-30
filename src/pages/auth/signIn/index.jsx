import { Formik, Form, Field } from 'formik'
import React from 'react'
import { IconFazo } from 'assets/images/png'
import { signIn } from 'store/auth'
import { Fields } from 'components'
import { Button } from 'antd'
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { get } from 'lodash'
import storage from 'services/storage'

const index = () => {
  const selector = useSelector((state) => state);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const validate = Yup.object({
    username: Yup.string()
      .max(15, 'Xarflar soni 15 dan oshmasin...!')
      .required("Username kiritilmagan...!"),
    password: Yup.string()
      .min(6, "Parol uzunligi 6 ta dan ko'p bo'lsin...!")
      .required("Parol kiritilmagan...!"),
  })

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post(
        "http://192.168.1.195:5055/auth/login",
        newTodo
      );
    },
    onSuccess: (data) => {
      storage.set("token", data.data.token)
      navigate("/");
      dispatch(signIn(data.data));
    },
  });

  return (
    <div className='
      w-screen 
      h-screen 
      flex 
      items-center 
      justify-center 
      bg-[url("/src/assets/images/jpg/login-background2.jpg")]
      bg-no-repeat	
      bg-cover	
      relative
      '
    >
      <div className='absolute grid place-items-center inset-0 bg-black bg-opacity-10'>
        <div className='
      w-[80%] sm:w-2/3 md:w-2/3 lg:w-1/3 
      shadow-md 
      p-4 sm:p-5 md:p-5 lg:p-5 
      rounded-md
      bg-[black]
      bg-opacity-40	
      backdrop-blur-md
      '>
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            onSubmit={(data) => {
              signIn(data)
            }}
            validationSchema={validate}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  <div className='text-center'>
                    <img src={IconFazo} className="sign-user-avatar bg-[#081224]" />
                    <h3 className='my-3 text-white'>Login</h3>
                  </div>
                  <Field
                    name='username'
                    label='User name'
                    component={Fields.Input}
                  />
                  <Field
                    name='password'
                    label='Password'
                    type="password"
                    component={Fields.Input}
                    hasPassword={true}
                  />
                  <Button className='col-md-3 mt-4' size='large' type='primary' onClick={() => mutation.mutate(values)}>Login</Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default index