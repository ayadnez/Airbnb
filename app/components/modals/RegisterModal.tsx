'use client';

import React from 'react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback,useState } from 'react';
import Modal from './Modal';

import {
     FieldValues,
     SubmitHandler,
     useForm
} from 'react-hook-form'

import useRegisterModal from '@/app/hooks/useRegisterModal';
import { error } from 'console';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { Island_Moments } from 'next/font/google';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState : {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues : {
            name : '',
            email : '',
            password : ''
        }
    });

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register',data)
          .then( () => {
            registerModal.onClose();
          })
          .catch( (error) => {
            console.log(error);
          })
          .finally( () => {
            setIsLoading(false);
          })
    }

    const bodyContent = (
      <div className='flex flex-col gap-4'>

        <Heading 
          title = "Welcome to Airbnb"
          subtitle='Create an account'
          
        />
        <Input 
          id='email'
          label='Emai'
          disabled = {isLoading}
          register={register}
          errors={errors}
          required
          
        />


      </div>
    )

  return (
    <Modal 
      disabled = {isLoading}
      isOpen = {registerModal.isOpen}
      title='Register'
      actionLabel='continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}

      />
  )
}

export default RegisterModal