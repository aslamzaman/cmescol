"use client";
import React, { useState } from "react";
import * as XLSX from 'xlsx';
const date_format = dt => new Date(dt).toISOString().split('T')[0];


const Check = () => {
    const [datas, setDatas] = useState([]);
    const [msg, setMsg] = useState("");



    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        setMsg("Please wait...");
        try {
            if (file) {
                const bufferObj = await file.arrayBuffer();

                const workbook = XLSX.read(bufferObj, { type: "binary" });
                const sheetName = workbook.SheetNames[5];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet, { header: ["participant", "id"] });
                console.log(json);
                setDatas(json);

            } else {
                console.log("Seclect an excel file");
            }
            setMsg("");
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <>
            <div className="w-full p-4 bg-red-200 py-6 border-2 rounded-lg shadow-lg overflow-auto">
                <div className="w-full mb-3 mt-8">
                    <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Participant From LogAlto</h1>
                    <h4 className="w-full font-bold text-center text-pink-700">{msg}</h4>
                </div>
            </div>

            <div className="w-1/2 mt-5">
                <input type="file" onChange={fileChangeHandler} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300 cursor-pointer" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
            </div>
            <div className="p-2 overflow-auto">
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-center border-b border-gray-200 px-4 py-2">SL</th>
                            <th className="text-start border-b border-gray-200 px-4 py-2">Participant</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Id</th>

                        </tr>
                    </thead>
                    <tbody>
                        {datas.length ? (
                            datas.map((data, i) => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={data.id}>
                                    <td className="text-start py-2 px-4">{i + 1}</td>
                                    <td className="text-start py-2 px-4">{data.participant}</td>
                                    <td className="text-center py-2 px-4">{data.id}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-10 px-4">
                                    Data not available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Check;