'use client';

import React from 'react'

import  {signIn} from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback,useState } from 'react';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import {
     FieldValues,
     SubmitHandler,
     useForm
} from 'react-hook-form'


import { error } from 'console';
import Heading from '../Heading';
import Input from '../inputs/Input';

import toast from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';


const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState : {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues : {
            email : '',
            password : ''
        }
    });

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials',{
          ...data,
          redirect: false,
        })
        .then((callback) =>{
          setIsLoading(false);

          if(callback?.ok) {
            toast.success("logged in");
            router.refresh();
            loginModal.onClose();
          }
          if(callback?.ok){
            toast.error(callback.error)
          }
        })
    }

    const bodyContent = (
      <div className='flex flex-col gap-4'>

        <Heading 
          title = "Welcome Back"
          subtitle='login to your account'
          
        />
        <Input 
          id='email'
          label='Email'
          disabled = {isLoading}
          register={register}
          errors={errors}
          required
          
        />
        
        <Input 
          id='password'
          type='password'
          label='Password'
          disabled = {isLoading}
          register={register}
          errors={errors}
          required
          
        />


      </div>
    )
    
    const footerContent = (
      <div className='flex flex-col gap-4 mt-3'>
        <hr />
        <Button 
          outline 
          label='continue with google'
          icon={FcGoogle}
          onClick={ () => signIn('google')}
        />
        <Button 
          outline 
          label='continue with github'
          icon={AiFillGithub}
          onClick={ () => signIn('github')}
        />
        <div
          className='
            text-neutral-500
            text-center
            mt-4
            font-light
          
          '
        >
          <div className='
          justify-center flex flex-row items-center gap-2 '>
            <div>
              Already have an account?
            </div>
            <div 
            onClick={registerModal.onClose}
            className='
               text-neutral-800
               cursor-pointer
               hover: underline
            '>
                Log in
            </div>

          </div>


        </div>
        



      </div>

    )

  return (
    <Modal 
      disabled = {isLoading}
      isOpen = {loginModal.isOpen}
      title='Login'
      actionLabel='continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}

      />
  )
}

export default LoginModal