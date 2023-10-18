import React from 'react'
import Image from 'next/image'

export default function Register_pic() {
  return (
    <section className='w-full mx-auto'>
        <Image
            className='border-4 border-black mx-auto mt-2'
            src='/Register.png'
            width={250}
            height={250}
            priority
            alt = "Register_pic"

        />
    </section>
  )
}
