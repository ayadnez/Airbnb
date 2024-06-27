'use client';

import React from 'react'

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
    var cloudinary  : any;
}

interface ImageUploadProps {
    onChange : (value: string) => void;
    value : string;
}


const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleUpload = useCallback((result: any) => {
        console.log('Upload result:', result); 
        onChange(result.info.secure_url);



    },[onChange])

    console.log('Component value:', value);

  return (
    <CldUploadWidget 
       onUpload = {handleUpload}
       uploadPreset='zrxogcf5'
       options={{
        maxFiles: 1
       }}
    >
        {({open}) => {

          console.log('Widget open function:', open);
            return (
                <div
                  onClick={ () => {
                    console.log('Div clicked, opening widget');
                    open?.()
                }}
                  className='
                    relative
                    cursor-pointer
                    hover:opacity-70
                    transition
                    border-dashed
                    border-2
                    p-20
                    border-neutral-200
                    flex
                    flex-col
                    justify-center
                    items-center
                    gap-4
                    text-neutral-600

                  '
                >
                    <TbPhotoPlus size={50} />
                    <div className='font-semibold text-lg'>
                        Click to upload
                    </div>
                    {value && (
                        <div
                         className='absolute inset-0 w-full h-full'
                        >
                            <Image 
                            alt='upload'
                            fill
                            style={{ objectFit : 'cover'}}
                            src={value}
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading='lazy'
                            
                            />
                        </div>
                    )}

                </div>
            )
        }}
    </CldUploadWidget>
  )
}

export default ImageUpload