"use client";
import React, { useState, useEffect } from "react";
import { TextDt, DropdownEn, TextNum } from "@/components/Form";
import { useRouter } from 'next/navigation'
import { formatedDate } from "@/lib/utils";
const unitShortName = [
    { id: "suruj", name: "SRJ", area: '   Tangail (Dhaka, Bangladesh, Asia)' },
    { id: "gobratola", name: "GOB", area: '   Nawabganj (Rajshahi, Bangladesh, Asia)' },
    { id: "jaldhaka", name: "JAL", area: '   Nilphamari (Rangpur, Bangladesh, Asia)' },
    { id: "deuty", name: "DUT", area: '   Rangpur (Rangpur, Bangladesh, Asia)' },
    { id: "khaserhat", name: "KHT", area: '   Patuakhali (Barisal, Bangladesh, Asia)' },
    { id: "damkura", name: "DMK", area: '   Pabna (Rajshahi, Bangladesh, Asia)' },
    { id: "jointiapur", name: "JNP", area: '   Sylhet (Sylhet, Bangladesh, Asia)' }
]



const Helper = () => {
    const [user, setUser] = useState("");
    const [unit, setUnit] = useState("");
    const [period, setPeriod] = useState("");
    const [sl, setSl] = useState("");
    const [dt, setDt] = useState("");
    const [perticipant, setPerticipant] = useState("");
    const router = useRouter()

    useEffect(() => {
        const helperData = localStorage.getItem('helper');
        const user = sessionStorage.getItem('col_auth');
        const getShortName = unitShortName.find(u => u.id === user);
        if (getShortName) {
            console.log(getShortName.id);
            setUnit(getShortName.id);
        }
        if (helperData) {
            const help = JSON.parse(helperData);
            setUser(help.user ? help.user : "Md. Zohurul Haque");
            setPeriod(help.period ? help.period : "Q3");
            setDt(formatedDate(help.dt) ? formatedDate(help.dt) : formatedDate(new Date()));
            setPerticipant(help.perticipant ? help.perticipant : "perticipant");
            setSl(help.sl ? help.sl : '361')
        }
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            user: user,
            unit: unit,
            period: period,
            sl: sl,
            dt: dt,
            perticipant: perticipant
        }
        localStorage.setItem('helper', JSON.stringify(data));
        router.push("/registration");
    }

    return (
        <>
            <section id="title" className="w-full">
                <h1 className="py-7 text-4xl text-center font-bold text-gray-400 uppercase">Registration Initial Data</h1>
            </section>


            <section className="w-full">
                <div className="w-10/12 mx-auto mt-4">  {/* center div */}
                    <div className="ww-full p-4 bg-red-100 rounded-lg shadow-lg overflow-auto">
                        <form onSubmit={submitHandler}>
                            <div className="w-full p-2 overflow-auto">
                                <div className="w-full lg:w-11/12 grid grid-cols-2 gap-4 mx-auto">
                                    <DropdownEn Title="Select User" Id="user" Change={e => setUser(e.target.value)} Value={user}>
                                        <option value="Md. Zohurul Haque">Md. Zohurul Haque</option>
                                        <option value="Zakia Akter">Zakia Akter</option>
                                        <option value="Aktera Khatun">Aktera Khatun</option>
                                        <option value="Sabina Yesmin">Sabina Yesmin</option>
                                        <option value="Md. Habibbur Rahman">Md. Habibbur Rahman</option>
                                        <option value="Md. Suaibur Rahman">Md. Suaibur Rahman</option>
                                        <option value="Md. Mizanur Rahman">Md. Mizanur Rahman</option>
                                        <option value="Md. Sanaullah">Md. Sanaullah</option>
                                        <option value="Md Shahin  Sarker">Md Shahin  Sarker</option>
                                    </DropdownEn>

                                    <DropdownEn Title="Select Quarter" Id="period" Change={e => setPeriod(e.target.value)} Value={period}>
                                        <option value="Q1">Quarter-1</option>
                                        <option value="Q2">Quarter-2</option>
                                        <option value="Q3">Quarter-3</option>
                                        <option value="Q4">Quarter-4</option>
                                    </DropdownEn>

                                    <DropdownEn Title="Select Options (Who will be registered?)" Id="perticipant" Change={e => setPerticipant(e.target.value)} Value={perticipant}>
                                        <option value="perticipant">Perticipant</option>
                                        <option value="parants">Parants/Community/Others</option>
                                    </DropdownEn>
                                    <TextNum Title="Learner ID (From which number to start)" Id="sl" Change={e => setSl(e.target.value)} Value={sl} />
                                    <TextDt Title="Registration Date (mm/dd/yyyy)" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />


                                    <button type="submit" className="h-[40px] mt-5 text-center mx-0.5 px-4 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-blue-600 hover:bg-blue-800 text-white cursor-pointer">Go to Registration Form</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );

};

export default Helper;


