"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UnitInfo } from "@/lib/data/attendance/UnitInfo";


const Layout = ({ children }) => {
    const [user, setUser] = useState("");
    const [unit, setUnit] = useState("");
    const router = useRouter();

    useEffect(() => {
        const getAuth = sessionStorage.getItem('col_auth');
        if (getAuth) {
            const unitName = UnitInfo.find(u => u.id === getAuth);
            setUnit(getAuth, unitName.name);
        } else {
            router.push("/");
        }

        const getUser = sessionStorage.getItem('col_user');
        if (getUser) {
            setUser(getUser);
        }
    }, [router])


    return (
        <>
            <section id="nuv" className="fixed top-0 w-screen h-[60px] bg-[#283a97ff]">
                <div className="w-full h-[60px] px-4 flex justify-between items-center">
                    <h1 className="tex-2xl text-white font-bold uppercase">cmes col project</h1>
                    <div className="w-auto h-[60px] flex items-center space-x-4">
                        <h1 className="text-white uppercase underline underline-offset-4">{unit} unit</h1>
                        <h1 className="text-white uppercase underline underline-offset-4">{user} </h1>
                    </div>
                </div>
            </section>
            <section className="fixed top-[60px] w-screen h-[calc(100vh-60px)] flex justify-between overflow-auto">
                <div className="w-[160px] lg:w-[250px] p-4 text-sm lg:text-base bg-[#2f2f2fff] flex flex-col justify-start space-y-2">
                    <Link href="/dashboard" className="text-white hover:text-gray-500 font-bold cursor-pointer decoration-4">Home</Link>
                    <Link href="/code" className="text-white hover:text-gray-500 font-bold cursor-pointer decoration-4">Id Generate</Link>
                    <Link href="/logaltodate" className="text-white hover:text-gray-500 font-bold cursor-pointer decoration-4">Date Correction</Link>
                    <Link href="/mobile" className="text-white hover:text-gray-500 font-bold cursor-pointer decoration-4">Mobile Correction</Link>
                    <Link href="/attendance" className="text-white hover:text-gray-500 font-bold cursor-pointer decoration-4">Attendance</Link>
                    <Link href="/registration/helper" className="text-white hover:text-gray-500 font-bold cursor-pointer decoration-4">Registration</Link>
                    <Link href="/bill" className="text-white hover:text-gray-500 font-bold cursor-pointer decoration-4">Bill Generate</Link>
                </div>
                <div className="w-[calc(100vw-160px)] lg:w-[calc(100vw-250px)] text-sm lg:text-base">
                    {children}
                    <div className="w-full h-[100px]"></div>
                </div>
            </section>

        </>
    )
}

export default Layout;