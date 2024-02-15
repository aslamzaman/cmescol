"use client"

import Link from "next/link";

export default function Home() {


  return (

    <>

      <div className="w-full h-[calc(100vw*0.44)] bg-gray-300 bg-cover bg-no-repeat" style={{ backgroundImage: 'url("/images/bg/bg.jpg")' }}>
        <div className="w-full h-full px-4 text-white flex flex-col justify-center backdrop-opacity-95 bg-black/40">

          <h1 className="w-full text-center text-3xl lg:text-5xl font-bold">Basic School Donor Visit</h1>
          <p className="w-full py-4 text-sm lg:text-xl text-center">
            Efforts to improve the lives of underprivileged boys and girls in the village through technical education
          </p>
        </div>
      </div>


      <div className="w-full bg-red-600 pt-10 pb-20 text-white">
        <h1 className="w-full text-5xl text-center font-bold pt-16 scale-x-75 uppercase">CMES</h1>
        <p className="w-9/12 md:w-1/3 mx-auto text-center my-4">
          We are committed to improving the human development, well-being and future of disadvantaged children in education and the workplace.
        </p>
        <p className="w-9/12 md:w-1/3 mx-auto text-center my-4">
          We have already helped nearly one million boys and girls reach their goals
        </p>
      </div>




      <div className="w-full bg-blue-200 pt-10 pb-20">
        <h1 className="w-full py-6 text-5xl text-center text-gray-600 font-bold pt-16 scale-x-75 uppercase">OUR WORK</h1>

        <div className="w-full px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">

          <div className="w-full p-2 bg-teal-100 border border-gray-3500">
            <img className="w-full h-auto" src="https://i.ibb.co/VpN99PF/DSC04768.jpg" alt="basic education" />
            <h1 className="w-full p-2 text-xl text-center hover:text-gray-500 uppercase font-bold">Basic Eductaion</h1>
          </div>



          <div className="w-full p-2 bg-teal-100 border border-gray-3500">
            <img className="w-full h-auto" src="https://i.ibb.co/KbxDXF1/DSC05029.jpg" alt="basic education" />
            <h1 className="w-full p-2 text-xl text-center hover:text-gray-500 uppercase font-bold">Wood Working</h1>
          </div>




          <div className="w-full p-2 bg-teal-100 border border-gray-3500">
            <img className="w-full h-auto" src="https://i.ibb.co/RbVWRN4/DSC04530.jpg" alt="basic education" />
            <h1 className="w-full p-2 text-xl text-center hover:text-gray-500 uppercase font-bold">Welding works</h1>
          </div>




          <div className="w-full p-2 bg-teal-100 border border-gray-3500">
            <img className="w-full h-auto" src="https://i.ibb.co/YjtTgyw/DSC04552.jpg" alt="basic education" />
            <h1 className="w-full p-2 text-xl text-center hover:text-gray-500 uppercase font-bold">Garments</h1>
          </div>






        </div>
      </div>


      <div className="w-full bg-green-600 pt-10 pb-20">
        <h1 className="w-full py-6 text-5xl text-center text-white font-bold pt-16 scale-x-75 uppercase">Some case story</h1>

        <div className="w-full px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">

          <div className="w-full p-2 bg-teal-100 border border-gray-3500">
            <img className="w-full h-auto" src="https://i.ibb.co/VpN99PF/DSC04768.jpg" alt="basic education" />
            <h1 className="w-full p-2 text-xl text-center hover:text-gray-500 uppercase font-bold">Basic Eductaion</h1>
          </div>



          <div className="w-full p-2 bg-teal-100 border border-gray-3500">
            <img className="w-full h-auto" src="https://i.ibb.co/KbxDXF1/DSC05029.jpg" alt="basic education" />
            <h1 className="w-full p-2 text-xl text-center hover:text-gray-500 uppercase font-bold">Wood Working</h1>
          </div>




          <div className="w-full p-2 bg-teal-100 border border-gray-3500">
            <img className="w-full h-auto" src="https://i.ibb.co/RbVWRN4/DSC04530.jpg" alt="basic education" />
            <h1 className="w-full p-2 text-xl text-center hover:text-gray-500 uppercase font-bold">Welding works</h1>
          </div>




          <div className="w-full p-2 bg-teal-100 border border-gray-3500">
            <img className="w-full h-auto" src="https://i.ibb.co/YjtTgyw/DSC04552.jpg" alt="basic education" />
            <h1 className="w-full p-2 text-xl text-center hover:text-gray-500 uppercase font-bold">Garments</h1>
          </div>






        </div>
      </div>
    </>

  );
}
