"use client"

export default function Home() {
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

          <h1 className="text-3xl font-bold">Basic School Donor Visit</h1>
          <p className="text-sm text-justify">
            Efforts to improve the lives of underprivileged boys and girls in the village through technical education
          </p>
        </div>
      </div>


      <div>
        <h1 className="text-5xl text-center font-bold pt-16">CMES</h1>
        <p className="w-9/12 md:w-1/3 mx-auto text-center my-4">
          We are committed to improving the human development, well-being and future of disadvantaged children in education and the workplace.

        </p>
        <p className="w-9/12 md:w-1/3 mx-auto text-center my-4">
          We have already helped nearly one million boys and girls reach their goals
        </p>
      </div>

      <div>
        <h1 className="text-5xl text-center font-bold pt-16">OUR WORK</h1>
        <p className="w-9/12 md:w-1/3 mx-auto text-center my-4">
          We are committed to improving the human development, well-being and future of disadvantaged children in education and the workplace.

        </p>
        <p className="w-9/12 md:w-1/3 mx-auto text-center my-4">
          We have already helped nearly one million boys and girls reach their goals
        </p>
      </div>


      ftert
    </div>
  );
}
