import React from 'react'
import Image from 'next/image'

export default function PBacklog_pic() {
  return (
    <section className='w-full mx-auto'>
        <Image
            className='border-4 border-black mx-auto mt-2'
            src='/PBacklog.png'
            width={950}
            height={400}
            priority
            alt = "PBacklog_pic"

        />
    </section>
  )
}