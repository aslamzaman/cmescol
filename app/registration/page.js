"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/registration/Add";
import Edit from "@/components/registration/Edit";
import Delete from "@/components/registration/Delete";
import Download from "@/components/registration/Download";
import Upload from "@/components/registration/Upload";
import { getItems } from "@/lib/LocalDatabase";
import { formatedDate } from "@/lib/utils";
import { BtnEn } from "@/components/Form";

const sortName = [
    { id: "suruj", name: "SRJ", area: '   Tangail (Dhaka, Bangladesh, Asia)' },
    { id: "gobratola", name: "GOB", area: '   Nawabganj (Rajshahi, Bangladesh, Asia)' },
    { id: "jaldhaka", name: "JAL", area: '   Nilphamari (Rangpur, Bangladesh, Asia)' },
    { id: "jointapur", name: "JNP", area: '   Sylhet (Sylhet, Bangladesh, Asia)' },
    { id: "deuty", name: "DUT", area: '   Rangpur (Rangpur, Bangladesh, Asia)' },
    { id: "khaserhat", name: "KHT", area: '   Patuakhali (Barisal, Bangladesh, Asia)' },
    { id: "damkura", name: "DMK", area: '   Pabna (Rajshahi, Bangladesh, Asia)' }
]



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
                const unit = newData.helper.unit;
                const participant = newData.helper.perticipant;
                const quarter = newData.helper.period;

                const unitName = sortName.find(u => u.id === unit);

                a.download = `Registration(1212.3)${formatedDate(new Date())}_CMES-${unitName.name}_${participant}_${quarter}.xlsx`;

                // a.download = "Registration.xlsx";
                document.body.appendChild(a);
                a.click();
                a.remove();
                console.log(`Excel file created and downloaded.`);

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
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Registration</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <div className="p-2 overflow-auto">
                    <div className="flex justify-end">
                        <div className="w-[80px] flex justify-center items-center space-x-4">
                        <Download message={messageHandler} />
                        <Upload message={messageHandler} />
                        </div>
                    </div>
                   
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
                                        <td className="text-end py-2 px-4">
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
                    <div className="flex justify-end w-full mb-20">
                        <BtnEn Title="Create Registration Sheet" Click={formSubmitHandler} Class="bg-blue-600 hover:bg-blue-800 text-white" />
                    </div>
                </div>
            </div>
        </>
    );

};

export default Registration;


