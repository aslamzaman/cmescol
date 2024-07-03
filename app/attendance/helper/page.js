"use client";
import React from "react";
import * as XLSX from 'xlsx';
const date_format = dt => new Date(dt).toISOString().split('T')[0];


const Certificate = () => {

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const bufferObj = await file.arrayBuffer();

            const workbook = XLSX.read(bufferObj, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { header: ["name", "quart", "trade"] });
            console.log(json);
          
            let x = [];

            let i = 0;
            const myTimer = setInterval(() => {
                console.log(json[i].name);
                x.push({ id: Date.now(), unit: 'deuty', code: json[i].name, quart: json[i].quart, trade: json[i].trade })
                i = i + 1;
                if (i >= json.length) {
                    clearInterval(myTimer);
                    console.log(x);
                }
            }, 100)


        } else {
            console.log("Seclect an excel file");
        }
    }
    /*
        "id": 1719460510910,
        "unit": "suruj",
        "code": "CMES-SRJ-0313 Surma Akter",
        "quart": "Q2",
        "trade": "vermi"
    */

    return (
        <>
            <div className="w-full p-4 bg-red-200 py-6 border-2 rounded-lg shadow-lg overflow-auto">
                <div className="w-full mb-3 mt-8">
                    <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Attendance Helper</h1>
                </div>
            </div>

            <div className="w-1/2 mt-5">
                <input type="file" onChange={fileChangeHandler} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300 cursor-pointer" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
            </div>
        </>
    );
}

export default Certificate;