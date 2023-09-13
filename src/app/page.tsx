"use client"
import React from 'react';
import IPageProps from '../../interfaces/page';
import Link from 'next/link'

const Landing: React.FunctionComponent<IPageProps> = props => {

    return (
      <div>
        <div className='my-20 flex text-5xl font-extrabold justify-center items-center'>Sunday.com</div>
          <Link href="/Login">
            <div className="flex justify-center mx-auto w-1/2 ">
              <button
                    className="flex justify-center items-centermx-auto mt-4 py-2 px-4 bg-gray-800 hover:bg-gray-700 focus:ring-gray-100 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" 
                    >
                        Click Here to Login
                </button>
            </div>
          </Link>
      </div>
    )
  
}


export default Landing
