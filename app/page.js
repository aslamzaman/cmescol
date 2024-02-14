"use client"

export default function Home() {
  const imgRatio = 0.75;



  const menuClick = () => {

  }
  return (
    <div className="w-screen h-screen inset-0 bg-white overflow-auto">

      <div className="sticky w-full h-[75px] px-6 top-0 flex justify-between items-center bg-white border border-gray-300 shadow-md z-10">

        <div className="flex flex-row items-center space-x-2">
          <div className="w-[40px]">
            <img className="w-full" src="/images/cmes_logo/cmes.png" alt="CMES Logo" />
          </div>
          <h1 className="text-xs sm:text-xl font-bold text-gray-500 scale-y-150">Centre for Mass Eductaion in Science</h1>
        </div>

        <div>
          <button onClick={menuClick} className="w-10 h-10 p-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black hover:stroke-blue-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

      </div>

      <div className="w-full h-[calc(100vw*0.44)] bg-gray-300 bg-cover bg-no-repeat" style={{ backgroundImage: 'url("/images/bg/bg.jpg")' }}>
        <div className="w-full h-full px-4 text-white flex flex-col justify-center backdrop-opacity-95 bg-black/40">

          <h1 className="w-full text-center text-3xl lg:text-5xl font-bold">Basic School Donor Visit</h1>
          <p className="w-full py-4 text-sm lg:text-xl text-center">
            Efforts to improve the lives of underprivileged boys and girls in the village through technical education
          </p>
        </div>
      </div>


      <div className="w-full bg-red-600 py-10 text-white">
        <h1 className="w-full text-5xl text-center font-bold pt-16 scale-x-75 uppercase">CMES</h1>
        <p className="w-9/12 md:w-1/3 mx-auto text-center my-4">
          We are committed to improving the human development, well-being and future of disadvantaged children in education and the workplace.
        </p>
        <p className="w-9/12 md:w-1/3 mx-auto text-center my-4">
          We have already helped nearly one million boys and girls reach their goals
        </p>
      </div>




      <div className="w-full bg-blue-200 py-10">
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


      <div className="w-full bg-green-600 py-10">
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


      <div className="w-full text-center py-16">
        <p>Center for Mass Education in Science (CMES) is an NGO which was registered by the NGO Affairs Bureau in 1978.</p>
        <p>Present office address is: House- 5/4, Block- F, Lalmatia, Dhaka- 1207, Bangladesh</p>
      </div>


    </div>
  );
}
