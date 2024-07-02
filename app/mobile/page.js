"use client"
import React, { useState } from "react";


export default function Mobile() {
    const [name, setName] = useState("");
    const [result, setResult] = useState("");

    const [msg, setMsg] = useState("");

    //13,17,19,18,15


    const isCorrect = (n) => {
        const n1 = parseInt(n).toString();
        if (n1.length === 10) {
            let x = n1.substring(0,1);
            console.log(x);
            if(parseInt(x)===1){
                return `0${n1}`;
            }else{
                return `--- Wrong prefix!`; 
            }
        } else {
            if (n1.length < 10) {
                return `--- Less than 11 digits`;
            } else {
                return `--- More than 11 digits`;
            }
        }
    }



    const dd = () => {
        if (name === "") {
            setMsg("** Please paste mobile list. **");
            return false;
        }

        const s = name.split('\n');
        let x = '';
        for (let i = 0; i < s.length; i++) {
            if (i === (s.length - 1)) {
                x = x + `${isCorrect(s[i])}`;
            } else {
                x = x + `${isCorrect(s[i])}\n`;
            }
        }
        setResult(x);
    }



    const clearHandler = () => {
        setResult("");
        setName("");
    }




    return (

        <div className="w-full h-auto px-4 mt-12 border-2 rounded-lg shadow-lg">

            <h1 className="text-4xl text-center mt-10 font-bold text-gray-500">Mobile Number Correction</h1>
            <p className="text-red-600 text-center font-bold mt-2">{msg}</p>

            <div className="w-full h-[24200px] p-4 bg-red-300 py-16">

                <div className="px-4 flex justify-start items-center space-x-4">
                    <button onClick={dd} className="text-center mx-0.5 px-4 py-1.5 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-blue-700 hover:bg-blue-900 text-white cursor-pointer">Generate</button>
                    <button onClick={clearHandler} className="text-center mx-0.5 px-4 py-1.5 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-green-700 hover:bg-green-900 text-white cursor-pointer">Clear All</button>
                </div>

                <div className="w-full grid grid-cols-2 gap-4 mt-5">
                    <div>
                        <p>Paste Number</p>
                        <textarea rows={1000} id="name" name="name" onChange={e => setName(e.target.value)} value={name} required maxLength={500000} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
                    </div>
                    <div>
                        <p>Results with correct date</p>
                        <textarea rows={1000} id="result" name="result" onChange={e => setResult(e.target.value)} value={result} required maxLength={500000} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
                    </div>
                </div>
            </div>
        </div>
    );
}
