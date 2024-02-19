'use client';
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'

const menuData = [
    { title: 'Home', url: '/' },
    { title: 'About', url: '/about' },
    { title: 'Field Area', url: '/fieldarea' }
]



const NavItem = ({ show, title, url }) => {
    const router = useRouter();
    const goUrl = () => {
        router.push(url);
        show(false);
    }
    return <button onClick={goUrl} className="px-2 py-1 text-center font-bold hover:text-gray-500 uppercase" >{title}</button>
}




const Navbar = ({ children }) => {
    const [menu, setMenu] = useState(false);

    return (
        <>
            <header className="fixed w-full h-[60px] top-0 px-3 sm:px-16 lg:px-20 flex justify-between items-center bg-gray-50 border-b-2 border-white shadow-md z-10">
                
                <div className="w-fit">
                    {
                        menu ? (<h1 className="text-sm font-bold uppercase">Menu</h1>)
                            : (<Link href="/" className="flex justify-start items-center space-x-2">
                                <img className="w-6 sm:w-7" src="/images/cmes_logo/cmes.png" alt="CMES Logo" />
                                <h1 className="text-sm font-bold sm:scale-y-150">Centre for Mass Eductaion in Science</h1>
                            </Link>)
                    }
                </div>


                <div className="block lg:hidden">
                    {
                        menu ? (<button onClick={() => setMenu(false)} className="w-10 h-10 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>)
                            : (<button onClick={() => setMenu(true)} className="w-10 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md ring-1 ring-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>)
                    }
                </div>

                <div className="hidden lg:flex justify-end items-center space-x-2">
                    {menuData.map((m, i) => <NavItem show={data => setMenu(data)} title={m.title} url={m.url} key={i} />)}
                </div>

            </header>



            {
                menu ? (
                    <nav id="menubar" onClick={e => e.target.id === "menubar" ? setMenu(false) : null} className="fixed w-full h-[calc(100vh-60px)] top-[60px] bg-black bg-opacity-40 overflow-auto z-10">
                        <div className="w-full py-6 flex flex-col justify-start items-center space-y-4 bg-white">
                            {menuData.map((m, i) => <NavItem show={data => setMenu(data)} title={m.title} url={m.url} key={i} />)}
                        </div>
                    </nav>
                )
                    : null
            }



            <main className="mt-[60px]">
                {children}
            </main>



            <footer className="w-full text-center py-16 bg-teal-100">
                <div className="w-full h-1 my-4 bg-red-500"></div>
                <p>Center for Mass Education in Science (CMES) is an NGO which was registered by the NGO Affairs Bureau in 1978.</p>
                <p>Present office address is: House- 5/4, Block- F, Lalmatia, Dhaka- 1207, Bangladesh</p>
                <p>Web address: www.cmesbd.org; Email: cmesbd@yahoo.com</p>
            </footer >
        </>
    )
}

export default Navbar;