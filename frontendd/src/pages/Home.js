import React from 'react'
import Main from  "../assets/main.png"

const Home = ({isLoggedIn}) => {
  return (
    <div className='flex mx-auto justify-center items-center text-white text-3xl h-full w-11/12'>
      <div className=' gap-4 flex flex-col w-[50%] leading-10'>
        <p className=' text-5xl'>We’re here to Increase your Productivity</p>
        <p className=' text-lg text-gray-400'>Let's make your work more organize and easily using the Taskio Dashboard with many of the latest featuresin managing work every day.</p>
      </div>
      <div className=' w-[50%]'>
        <img src={Main}/>
      </div>
    </div>
  )
}

export default Home
