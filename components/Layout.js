"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";



const Layout = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const getAuth = sessionStorage.getItem('col_auth');
        if (!getAuth) {
            router.push("/");
        }
    }, [])
    return (
        <>
            <div className="w-full h-[50px] px-4 pt-2 pb-3 flex space-x-4 border bg-gray-600 shadow-md">
                <Link href="/dashboard" className="text-white hover:text-gray-500 font-bold cursor-pointer underline underline-offset-4 decoration-4">Home</Link>
                <Link href="/code" className="text-white hover:text-gray-500 font-bold cursor-pointer underline underline-offset-4 decoration-4">Id Generate</Link>
                <Link href="/logaltodate" className="text-white hover:text-gray-500 font-bold cursor-pointer underline underline-offset-4 decoration-4">Date Correction</Link>
                <Link href="/mobile" className="text-white hover:text-gray-500 font-bold cursor-pointer underline underline-offset-4 decoration-4">Mobile Correction</Link>
                <Link href="/attendance" className="text-white hover:text-gray-500 font-bold cursor-pointer underline underline-offset-4 decoration-4">Attendance</Link>
                <Link href="/registration/helper" className="text-white hover:text-gray-500 font-bold cursor-pointer underline underline-offset-4 decoration-4">Registration</Link>
            </div>
            {children}
        </>
    )
}

export default Layout;