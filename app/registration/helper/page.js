"use client";
import React, { useState, useEffect } from "react";
import { TextDt, DropdownEn, TextNum } from "@/components/Form";
import { useRouter } from 'next/navigation'
import { formatedDate } from "@/lib/utils";

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
        if (helperData) {
            const help = JSON.parse(helperData);
            setUser(help.user ? help.user : "Md. Zohurul Haque");
            setPeriod(help.period ? help.period : "Q3");
            setUnit(help.unit ? help.unit : "suruj");
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
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Registration Initial Data</h1>

            </div>


            <div className="w-full p-4 bg-red-200 py-6 border-2 rounded-lg shadow-lg overflow-auto">
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
                            <DropdownEn Title="Select Unit" Id="unit" Change={e => setUnit(e.target.value)} Value={unit}>
                                <option value="suruj">Suruj</option>
                                <option value="gobratola">Gobratola</option>
                                <option value="jaldhaka">Jaldhaka</option>
                                <option value="jointapur">Jointapur</option>
                                <option value="deuty">Deuty</option>
                                <option value="khaserhat">Khaserhat</option>
                                <option value="damkura">Damkura</option>
                            </DropdownEn>

                            <DropdownEn Title="Select Qurter" Id="period" Change={e => setPeriod(e.target.value)} Value={period}>
                                <option value="Q1">Quarter-1</option>
                                <option value="Q2">Quarter-2</option>
                                <option value="Q3">Quarter-3</option>
                                <option value="Q4">Quarter-4</option>
                            </DropdownEn>

                            <DropdownEn Title="Select Options" Id="perticipant" Change={e => setPerticipant(e.target.value)} Value={perticipant}>
                                <option value="perticipant">Perticipant</option>
                                <option value="parants">Parants/Community/Others</option>
                            </DropdownEn>
                            <TextNum Title="LearnId (Start SL No)" Id="sl" Change={e => setSl(e.target.value)} Value={sl} />
                            <TextDt Title="Registration Date (mm/dd/yyyy)" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                        </div>
                        <div className="w-full lg:w-11/12 mx-auto">
                            <button type="submit" className="h-[40px] mt-5 text-center mx-0.5 px-4 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-blue-600 hover:bg-blue-800 text-white cursor-pointer">Go to Registration Form</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );

};

export default Helper;


