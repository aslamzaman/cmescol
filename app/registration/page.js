"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/registration/Add";
import Edit from "@/components/registration/Edit";
import Delete from "@/components/registration/Delete";
import { getItems } from "@/lib/LocalDatabase";
import { formatedDate } from "@/lib/utils";

const Registration = () => {
    const [registrations, setRegistrations] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");


    useEffect(() => {
        const getData = () => {
            setWaitMsg('Please Wait...');
            try {
                const response = getItems('registration');
                console.log(response.data);
                setRegistrations(response.data);
                setWaitMsg('');
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getData();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    const checkChangeHandler = (e) => {
        const id = e.target.id;
        setDatas(prev => {
            return prev.map(p => p.id.toString() === id ? { ...p, isChecked: !p.isChecked } : p)
        });
    };


    const formSubmitHandler = async (e) => {
        e.preventDefault();
        if (registrations.length < 1) {
            setMsg("No data found!");
            return false;
        }
        setMsg("Please wait...");




        try {
            const newData = { helper: getItems('helper').data, data: registrations };

            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/registration`;
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
                /*
                const unitName = unitShortName.find(u => u.id === unit);
                const tradeName = tradeShortName.find(t => t.id === trade);
                a.download = `Attendance(1212.3)${date_format(dt)}_CMES-${unitName.name}_${tradeName.name}_${quarter}.xlsx`;
                */
                a.download = "Registration.xlsx";
                document.body.appendChild(a);
                a.click();
                a.remove();
                console.log(`Excel file created and downloaded.`);

            } else {
                throw new Error("Failed to create Excel file");
            }
            setMsg("");
            setIsCursorDisabled(false);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };








    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Registration</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <div className="p-2 overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-center border-b border-gray-200 px-4 py-2">SL</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Name</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Disability</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Disabilitynature</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Edn</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Employeement</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end py-0.5 pr-4">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.length ? (
                                registrations.map((registration, i) => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={registration.id}>
                                        <td className="text-center py-2 px-4">{i + 1}</td>
                                        <td className="text-start py-2 px-4">
                                            <span className="font-bold">{registration.name}</span>-{registration.gender} <br />
                                            {registration.fmName} <br />
                                            {registration.isMarried} <br />
                                            {registration.dob} <br />
                                            {registration.village} <br />
                                            {registration.religion} <br />
                                            {registration.device} <br />
                                            {registration.mobile} <br />
                                        </td>
                                        <td className="text-center py-2 px-4">{registration.disability}</td>
                                        <td className="text-center py-2 px-4">{registration.disabilityNature}</td>
                                        <td className="text-center py-2 px-4">{registration.edn}</td>
                                        <td className="text-center py-2 px-4">{registration.employeement}</td>
                                        <td className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                            <Edit message={messageHandler} id={registration.id} data={registrations} />
                                            <Delete message={messageHandler} id={registration.id} data={registrations} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={15} className="text-center py-10 px-4">
                                        Data not available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <button onClick={formSubmitHandler}>.</button>
                </div>
            </div>
        </>
    );

};

export default Registration;


