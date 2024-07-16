"use client"
import { DropdownEn } from "@/components/Form";
import React, { useEffect, useState } from "react";

const formatedDate = (dt) => {
    const d = new Date(dt);
    const d1 = d.getFullYear();
    const d2 = d.getMonth();
    const d3 = d.getDate();
    const utcDate = new Date(Date.UTC(d1, d2, d3));
    return utcDate.toISOString().split('T')[0];
}

function isDate(value) {
    const timestamp = Date.parse(value);
    return !isNaN(timestamp);
}


const myAge = (dt) => {
    let d1 = new Date(dt).getTime();
    let d2 = Date.now();
    let d3 = d2 - d1;
    return Math.round(d3 / (1000 * 31556952));
}


export default function Logalotdate() {
    const [name, setName] = useState("");
    const [result, setResult] = useState("");
    const [result2, setResult2] = useState("");
    const [perticipant, setPerticipant] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        setPerticipant("1");
    }, [])

    const dd = () => {
        if (name === "") {
            setMsg("** Please paste your participant list. **");
            return false;
        }

        const s = name.split('\n');
        let x = '';
        let x1 = '';

        for (let i = 0; i < s.length; i++) {

            if (i === (s.length - 1)) {
                x = x + `${isDate(s[i]) === false ? "***" : formatedDate(s[i])}`;

                if (perticipant === "1") {
                    x1 = x1 + `${myAge(s[i]) < 11 ? `--- Younger (${myAge(s[i])} years)` : myAge(s[i]) > 56 ? `--- Older (${myAge(s[i])} years)` : myAge(s[i])}`;
                } else {
                    x1 = x1 + `${myAge(s[i]) < 20 ? `--- Younger (${myAge(s[i])} years)` : myAge(s[i]) > 90 ? `--- Older (${myAge(s[i])} years)` : myAge(s[i])}`;
                }

            } else {
                x = x + `${isDate(s[i]) === false ? "***" : formatedDate(s[i])}\n`;
                if (perticipant === "1") {
                    x1 = x1 + `${myAge(s[i]) < 11 ? `--- Younger (${myAge(s[i])} years)` : myAge(s[i]) > 56 ? `--- Older (${myAge(s[i])} years)` : myAge(s[i])}\n`;
                } else {
                    x1 = x1 + `${myAge(s[i]) < 20 ? `--- Younger (${myAge(s[i])} years)` : myAge(s[i]) > 90 ? `--- Older (${myAge(s[i])} years)` : myAge(s[i])}\n`;
                }
            }
        }

        setResult(x);
        setResult2(x1);

        console.log(x)
    }



    const clearHandler = () => {
        setResult("");
        setResult2("");
        setName("");
    }



    return (
        <>
            <div id="title" className="w-full">
                <h1 className="py-4 text-3xl text-center font-bold text-gray-400 uppercase">Date-Age Create</h1>
                <p className="text-red-600 text-center font-bold">{msg}</p>
            </div>

            <div className="w-ful px-4 mx-auto">
                <div className="w-full p-1 bg-red-100 rounded-lg shadow-lg">
                    <div className="px-4 flex justify-start items-center space-x-4">
                        <button onClick={dd} className="text-center mt-5 mx-0.5 px-4 py-1.5 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-blue-700 hover:bg-blue-900 text-white cursor-pointer">Generate</button>
                        <button onClick={clearHandler} className="text-center mt-5 mx-0.5 px-4 py-1.5 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-green-700 hover:bg-green-900 text-white cursor-pointer">Clear All</button>
                        <div className="w-auto">
                            <DropdownEn Title="Select Option" Id="perticipant" Change={e => setPerticipant(e.target.value)} Value={perticipant}>
                                <option value="1">Participants</option>
                                <option value="2">Parents</option>
                            </DropdownEn>
                        </div>
                    </div>


                    <div className="w-full flex text-xs lg:text-base pt-4">
                        <div className="w-3/12">
                            <p>Paste Date</p>
                            <textarea rows={1000} id="name" name="name" onChange={e => setName(e.target.value)} value={name} required maxLength={500000} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
                        </div>
                        <div className="w-4/12">
                            <p>Results with correct date</p>
                            <textarea rows={1000} id="result" name="result" onChange={e => setResult(e.target.value)} value={result} required maxLength={500000} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
                        </div>
                        <div className="w-5/12">
                            <p>Ages</p>
                            <textarea rows={1000} id="result2" name="result2" onChange={e => setResult2(e.target.value)} value={result2} required maxLength={500000} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
