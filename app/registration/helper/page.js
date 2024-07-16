"use client";
import React, { useState, useEffect } from "react";
import { TextDt, DropdownEn, TextNum } from "@/components/Form";
import { useRouter } from 'next/navigation'
import { formatedDate } from "@/lib/utils";
import { UnitInfo } from '@/lib/data/attendance/UnitInfo';

const Helper = () => {
    const [period, setPeriod] = useState("");
    const [sl, setSl] = useState("");
    const [dt, setDt] = useState("");
    const [perticipant, setPerticipant] = useState("");

    const router = useRouter()

    useEffect(() => {
        const helperData = localStorage.getItem('helper');
        if (helperData) {
            const help = JSON.parse(helperData);
            setPeriod(help.period ? help.period : "Q4");
            setDt(formatedDate(help.dt) ? formatedDate(help.dt) : formatedDate(new Date()));
            setPerticipant(help.perticipant ? help.perticipant : "perticipant");
            setSl(help.sl ? help.sl : '361')
        }
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        const sessionUnit = sessionStorage.getItem("col_auth");
        const findUnit = UnitInfo.find(u=>u.id === sessionUnit);
        const data = {
            period: period,
            sl: sl,
            dt: dt,
            perticipant: perticipant,
            unitShortName: findUnit.shortName,
            area: findUnit.area,
            userName: sessionStorage.getItem("col_user")
        }
        localStorage.setItem('helper', JSON.stringify(data));
        router.push("/registration");
    }

    return (
        <>
            <div id="title" className="w-full">
                <h1 className="py-4 text-3xl text-center font-bold text-gray-400 uppercase">Registration Initial Data</h1>
            </div>


            <div className="w-ful px-4 mx-auto">
                <div className="w-full p-1 bg-red-100 rounded-lg shadow-lg">
                    <form onSubmit={submitHandler}>
                        <div className="w-full lg:w-11/12 p-4 grid grid-cols-2 gap-4">
                            <DropdownEn Title="Select Quarter" Id="period" Change={e => setPeriod(e.target.value)} Value={period}>
                                <option value="Q1">Quarter-1</option>
                                <option value="Q2">Quarter-2</option>
                                <option value="Q3">Quarter-3</option>
                                <option value="Q4">Quarter-4</option>
                            </DropdownEn>

                            <DropdownEn Title="Select Options (Who will be registered?)" Id="perticipant" Change={e => setPerticipant(e.target.value)} Value={perticipant}>
                                <option value="perticipant">Perticipant</option>
                                <option value="parents">Parants/Community/Others</option>
                            </DropdownEn>
                            <TextNum Title="Learner ID (From which number to start)" Id="sl" Change={e => setSl(e.target.value)} Value={sl} />
                            <TextDt Title="Registration Date (mm/dd/yyyy)" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />

                            <button type="submit" className="h-[40px] text-center mx-0.5 px-4 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-blue-600 hover:bg-blue-800 text-white cursor-pointer">Go to Registration Form</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );

};

export default Helper;


