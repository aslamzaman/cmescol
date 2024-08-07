"use client"
import React, { useEffect, useState } from "react";
import { DropdownEn, TextDt, BtnSubmitDisabled } from "@/components/Form";
import { participant } from "@/lib/data/attendance/participant";
const date_format = dt => new Date(dt).toISOString().split('T')[0];
import { UnitInfo } from "@/lib/data/attendance/UnitInfo";
/* ------- For file naming only --------- */
const unitShortName = [
    { id: 'suruj', name: 'SRJ' },
    { id: 'gobratola', name: 'GOB' },
    { id: 'jaldhaka', name: 'JAL' },
    { id: 'deuty', name: 'DUT' },
    { id: 'khaserhat', name: 'KHT' },
    { id: 'damkura', name: 'DMK' },
    { id: 'jointiapur', name: 'JNP' }
]

const tradeShortName = [
    { id: 'com', name: 'COM' },
    { id: 'dress', name: 'DRESS' },
    { id: 'vermi', name: 'VERMI' }
]
/* ------- /For file naming only --------- */

export default function Attendanc() {
    const [datas, setDatas] = useState([]);
    const [unit, setUnit] = useState("");
    const [quarter, setQuarter] = useState("");
    const [trade, setTrade] = useState("");
    const [dt, setDt] = useState("");
    const [msg, setMsg] = useState("");


    useEffect(() => {
        const sessionUnit = sessionStorage.getItem('col_auth');
        setUnit(sessionUnit);
        setQuarter(localStorage.getItem('quarter') ? localStorage.getItem('quarter') : "");
        setTrade(localStorage.getItem('trade') ? localStorage.getItem('trade') : "");
        setDt("");
    }, [])


    const searchHandler = (e) => {
        e.preventDefault();

        const dataFilter = participant.filter(p => p.unit === unit && p.quart === quarter && p.trade === trade);
        // Add new object
        const withChecked = dataFilter.map(d => {
            return {
                ...d,
                isChecked: true
            }
        })
        console.log(withChecked);
        setDatas(withChecked);

        /* Initial data save to localStrorage */
        localStorage.setItem('quarter', quarter);
        localStorage.setItem('trade', trade);
    }


    const createObject = () => {
        const sessionUnit = sessionStorage.getItem('col_auth');
        const sessionUser = sessionStorage.getItem('col_user');
        const findUnit = UnitInfo.find(u => u.id === sessionUnit);
        console.log(sessionUnit, findUnit, sessionUser);

        return {
            unit: unit,
            quarter: quarter,
            trade: trade,
            user: sessionUser,
            dt: dt
        }
    }


    const checkChangeHandler = (e) => {
        const id = e.target.id;
        setDatas(prev => {
            return prev.map(p => p.id.toString() === id ? { ...p, isChecked: !p.isChecked } : p)
        });
    };


    const formSubmitHandler = async (e) => {
        e.preventDefault();
        if (datas.length < 1) {
            setMsg("No data found!");
            return false;
        }
        setMsg("Please wait...");
        try {
            const newObject = createObject();
            const selectedData = datas.filter(data => data.isChecked);
            const newData = { data: selectedData, searchData: newObject };

            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/attendance`;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newData)
            };

            const response = await fetch(apiUrl, requestOptions);

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;

                /* find custom name for file naming */
                const unitName = unitShortName.find(u => u.id === unit);
                const tradeName = tradeShortName.find(t => t.id === trade);
                a.download = `Attendance(1212.3)${date_format(dt)}_CMES-${unitName.name}_${tradeName.name}_${quarter}.xlsx`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                console.log(`Excel file created and downloaded.`);
                setDatas([]);
                setDt("");
            } else {
                throw new Error("Failed to create Excel file");
            }
            setMsg("");
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };


    return (
        <>
            <div id="title" className="w-full">
                <h1 className="py-4 text-3xl text-center font-bold text-gray-400 uppercase">Attendance</h1>
                <p className="text-red-600 text-center font-bold">{msg}</p>
            </div>

            <div className="w-full p-4">
                <div className="w-full lg:w-7/12 mx-auto p-4 bg-red-100 rounded-lg shadow-lg overflow-auto">
                    <form onSubmit={searchHandler}>
                        <div className="grid grid-cols-2 gap-4">

                            <DropdownEn Title="Trade" Id="trade" Change={e => setTrade(e.target.value)} Value={trade}>
                                <option value="com">Computer</option>
                                <option value="dress">Dress Making</option>
                                <option value="vermi">Vermicompost</option>
                            </DropdownEn>

                            <DropdownEn Title="Select Qurter" Id="perticipant" Change={e => setQuarter(e.target.value)} Value={quarter}>
                                <option value="Q1">Quarter-1</option>
                                <option value="Q2">Quarter-2</option>
                                <option value="Q3">Quarter-3</option>
                                <option value="Q4">Quarter-4</option>
                            </DropdownEn>

                            <TextDt Title="Atte. Date (mm/dd/yyyy)" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />

                            <div className="w-[90px] flex justify-end">
                                <button type="submit" className="h-[40px] mt-5 text-center mx-0.5 px-4 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-blue-600 hover:bg-blue-800 text-white cursor-pointer">Search</button>
                            </div>
                        </div>
                    </form>
                </div>


                <div className="w-full mt-4 p-4 bg-pink-100 rounded-lg shadow-lg overflow-auto">
                    <form onSubmit={formSubmitHandler}>
                        <table className="w-full border border-gray-200">
                            <thead>
                                <tr className="w-full bg-gray-200">
                                    <th className="text-center border-b border-gray-200 px-4 py-2">SL</th>
                                    <th className="text-start border-b border-gray-200 px-4 py-2">Participant</th>
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Attendance Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.length ? (
                                    datas.map((data, i) => (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={data.id}>
                                            <td className="text-center py-2 px-4">{i + 1}</td>
                                            <td className="text-start py-2 px-4">{data.code}</td>
                                            <td className="text-center py-2 px-4">
                                                <input
                                                    type="checkbox"
                                                    id={data.id.toString()}
                                                    checked={data.isChecked}
                                                    onChange={checkChangeHandler}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center py-10 px-4">
                                            Data not available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div>
                            <button type="submit" className="text-center mt-5 mx-0.5 px-4 py-1.5 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-blue-700 hover:bg-blue-900 text-white cursor-pointer">Create Excel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
