"use client";
import { DropdownEn, TextDt, TextEn, TextNum } from "@/components/Form";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { formatedDate } from "@/lib/utils";
import { UnitInfo } from "@/lib/data/attendance/UnitInfo";

const Bill = () => {
    const [imageDatas, setImageDatas] = useState([]);
    const [unit, setUnit] = useState("");
    const [activity, setActivity] = useState("");
    const [taka, setTaka] = useState("");
    const [detail, setDetail] = useState("");
    const [dt, setDt] = useState("");
    const [q, setQ] = useState("");
    const [brakeup, setBrakeup] = useState("0+0+0+0+...");
    const [msg, setMsg] = useState("");


    // This is my nextjs project function; Please provide me corrct code.
    const fileChangeHandlerImage = async (e) => {
        try {
            const file = e.target.files;
            const imageData = [];

            for (let i = 0; i < file.length; i++) {
                // console.log(file[i]);
                const imagBlobUrl = URL.createObjectURL(file[i]);
                const newImage = new Image();
                newImage.src = imagBlobUrl;

                await new Promise((resolve) => {
                    newImage.onload = () => {
                        const imageWidth = newImage.width;
                        const imageHeight = newImage.height;
                        imageData.push({ url: imagBlobUrl, width: imageWidth, height: imageHeight, name: file[i].name, type: file[i].type, size: file[i].size });
                        resolve();
                    };
                });
            }
            console.log(imageData);
            setImageDatas(imageData)
            const reduceName = imageData.reduce((t, c) => t + `+${c.name}`, '');
            const subStringText = reduceName.substring(1, reduceName.length);
            console.log(subStringText);
            setBrakeup(subStringText);


        } catch (e) {
            console.log(e);
        }
    }



    const createObject = () => {
        const sessionUnit = sessionStorage.getItem('col_auth');
        const unitName = UnitInfo.find(u => u.id === sessionUnit);
        return {
            imageDatas: imageDatas,
            unit: unitName.shortName,
            unitFullName: unitName.name,
            activity: activity,
            taka: taka,
            detail: detail,
            dt: dt,
            q: q
        }
    }


    const formSubmitHandler = async (e) => {
        e.preventDefault();
        if (imageDatas.length < 1) {
            setMsg("Please select the bill image files");
            return false;
        }
        const splitDetail = detail.split("+");
        const totalCheck = splitDetail.reduce((t, c) => t + parseFloat(c.trim()), 0);
        console.log(parseFloat(taka), totalCheck, splitDetail.length, imageDatas.length);
        if (parseFloat(taka) !== totalCheck || splitDetail.length !== imageDatas.length) {
            setMsg("Total taka and breakup taka are not equal");
            return false;
        }



        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            floatPrecision: 16 // or "smart", default is 16
        });

        setMsg("Please wait...");
        try {

            // Excel part
            const newObject = createObject();
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/bill`;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };

            const response = await fetch(apiUrl, requestOptions);

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;

                /* find custom name for file naming */
                const sessionUnit = sessionStorage.getItem('col_auth');
                const unitName = UnitInfo.find(u => u.id === sessionUnit);
                a.download = `Bill-CMES-${unitName.shortName}-${q}-${formatedDate(dt)}.xlsx`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                console.log(`Excel file created and downloaded.`);


                // PDF part
                //------------------------------------------------
                // { url: imagBlobUrl, width: imageWidth, height: imageHeight, name: file[i].name, type: file[i].type, size: file[i].size }
                // page size 297, 210
                doc.setFont("times", "normal");
                doc.setFontSize(12);
                for (let i = 0; i < imageDatas.length; i++) {
                    const imgWeight = imageDatas[i].width * 0.26458333333719; // convert px to mm
                    const imgHeight = imageDatas[i].height * 0.26458333333719; // convert px to mm

                    let imW = 0;
                    let imH = 0;
                    if (imgWeight > 210) {
                        let x = 210 / imgWeight // image and page width ratio                       

                        imW = (imgWeight * x) * (3 / 4);
                        imH = (imgHeight * x) * (3 / 4);
                        if (imH > 243) {
                            imH = 243;
                        } else {
                            imH = imH;
                        }

                    } else {
                        imW = imgWeight;
                        imH = imgHeight;
                        if (imH > 243) {
                            imH = 243;
                        } else {
                            imH = imH;
                        }

                    }


                    const leftPosition = (210 - imW) / 2;
                    const topPosition = 24;

                    doc.addImage(`${imageDatas[i].url}`, `${imageDatas[i].type}`, leftPosition, topPosition, imW, imH);

                    const billNoTwoDigitString = "0" + (i + 1);
                    const billNoTwoDigit = billNoTwoDigitString.substring(billNoTwoDigitString.length - 2, 2);

                    const bills = detail;
                    const splitBlill = bills.split("+");

                    const sessionUnit = sessionStorage.getItem('col_auth');
                    const unitName = UnitInfo.find(u => u.id === sessionUnit);

                    doc.setFont("times", "bold");
                    doc.setFontSize(16);
                    const str = `Bill No: CMES-${unitName.shortName}-${q}-${formatedDate(dt)}-Bill-${billNoTwoDigit}`

                    doc.text(`Bill (Taka): ${splitBlill[i]}/-`, 105, 274, null, null, "center");
                    doc.setFont("times", "normal");
                    doc.setFontSize(12);
                    doc.text(`Unit: ${unitName.name}`, 105, 279, null, null, "center");
                    doc.text(`${str}`, 105, 284, null, null, "center");

                    doc.addPage("a4", "p");
                }
                doc.deletePage(imageDatas.length + 1);
                doc.save(`PDF-Bill-CMES-${unitName.shortName}-${q}-${formatedDate(dt)}.pdf`);

            } else {
                throw new Error("Failed to create Excel file");
            }
            setMsg("");
        } catch (error) {
            console.error("Error saving data:", error);
        }
    }


    return (
        <>
            <div id="title" className="w-full">
                <h1 className="py-4 text-3xl text-center font-bold text-gray-400 uppercase">Bill Generate</h1>
                <p className="text-red-600 text-center font-bold">{msg}</p>
            </div>


            <div className="w-full p-4">
                <div className="w-full lg:w-7/12 mx-auto p-4 bg-red-100 rounded-lg shadow-lg">
                    <form onSubmit={formSubmitHandler}>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="w-full col-span-3">
                                <input type="file" onChange={fileChangeHandlerImage} className="w-full px-4 py-4 mb-2 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300 cursor-pointer" multiple accept=".jpg,.png" />
                                <TextEn Title={`Write Taka: ${brakeup}`} Change={e => setDetail(e.target.value)} Value={detail} Chr="150" />
                            </div>


                            <DropdownEn Title="Select Qurter" Change={e => setQ(e.target.value)} Value={q}>
                                <option value="Q1">Q1</option>
                                <option value="Q2">Q2</option>
                                <option value="Q3">Q3</option>
                                <option value="Q4">Q4</option>
                            </DropdownEn>
                            <DropdownEn Title="Activity" Change={e => setActivity(e.target.value)} Value={activity}>
                                <option value="1111.4">1111.4-Training sessions for women and girls</option>
                                <option value="1111.5">1111.5-Awareness raising events in communities</option>
                                <option value="1122.1">1122.1- Training traditional leaders </option>
                            </DropdownEn>
                            <TextDt Title="Bill Date" Change={e => setDt(e.target.value)} Value={dt} />
                            <TextNum Title="Total Taka" Change={e => setTaka(e.target.value)} Value={taka} />
                            <div>
                                <button type="submit" className="text-center mt-5 mx-0.5 px-4 py-1.5 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-blue-700 hover:bg-blue-900 text-white cursor-pointer">Create Bill</button>
                            </div>

                        </div>
                    </form>
                </div>

            </div>

        </>
    );
}

export default Bill;