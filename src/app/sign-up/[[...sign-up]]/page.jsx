import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-800" >
    <SignUp />
    </div>
  )
}

export default page
