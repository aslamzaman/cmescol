"use client"
import React, { useState } from "react";
import { DropdownEn, BtnSubmit, TextNum } from "@/components/Form";
import { formatedDate, dateDifferenceInDays } from "@/lib/utils";
import { jsonDataFromExcelSheet, excelSheetFromJsonData, excelFormat } from "@/lib/FunctionsAll";


export default function Home() {
  const [data, setData] = useState([]);
  const [unit, setUnit] = useState("");
  const [sl, setSl] = useState("");
  const [msg, setMsg] = useState("");


  const fileChangeHandler = async (e) => {
    const response = await jsonDataFromExcelSheet(e.target.files[0], ["Name", "DateOfBirth", "Mobile"]);
    console.log(response);
    setData(response);
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    if (!data.length) {
      setMsg("Please select an formated excel file.");
      return false;
    }
    setMsg("Please wait...");


    try {
      const newJson = data.map((item, i) => {
        const daysCalculation = dateDifferenceInDays(new Date(item.DateOfBirth), new Date(), true);
        const yrs = daysCalculation / 365;
        const Age = yrs < 12 || yrs > 80 ? '***' : Math.round(yrs);
        //----------------------------------------
        const CorrectDate = formatedDate(item.DateOfBirth).toString();
        //----------------------------------------
        const mobile = parseInt(item.Mobile);
        const elevenDigit = "000000000000000000" + mobile;
        const fixedDigti = elevenDigit.slice(-11);

        const CorrectMobile = fixedDigti.length !== 11 || fixedDigti.charAt(0) !== '0' ? '***' : fixedDigti.toString();
        //----------------------------------------
        const stdSl = "0000000" + (parseInt(sl) + i);
        const stSL = stdSl.slice(-4);
        console.log(stSL)
        const RegistrationCode = `CMES-${unit.trim()}-${stSL}-${item.Name}`;
        const LearnerId = `CMES-${unit.trim()}-${stSL}`;
        return {
          ...item, Age, CorrectDate, CorrectMobile, RegistrationCode, LearnerId
        }
      })
      console.log(newJson);

      excelSheetFromJsonData(newJson);
      //-------------------------------

    } catch (err) {
      console.log(err);
    }
  }





  const downloadExcelFormat = () => {
    try {
      excelFormat();
      return `Excel file has been successfully created.`;
    } catch (error) {
      console.error('Error exporting data to Excel:', error);
    }
  }





  return (
    <section className="w-screen h-screen p-4 border">

      <div id="box" className="w-full lg:w-1/2 mx-auto mt-16 p-4 border border-gray-200 bg-gray-100 rounded-md shadow-md">
        <h1 className="w-full py-4 text-2xl text-gray-600 text-center font-bold uppercase underline">cmes col project</h1>
        <p className="w-full py-2 text-red-400 text-center">{msg}</p>

        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 gap-4">
            <DropdownEn Title="Select Unit" Change={e => setUnit(e.target.value)} value={unit}>
              <option value="SRJ">SRJ</option>
              <option value="NDR">NDR</option>
              <option value="JAL">JAL</option>
              <option value="DUT">DUT</option>
              <option value="RNB">RNB</option>
              <option value="DMK">DMK</option>
              <option value="JNP">JNP</option>
            </DropdownEn>

            <TextNum Title="Serial Start" Id="sl" Change={e => setSl(e.target.value)} Value={sl} />
          </div>
          <div className="w-full mt-4 flex items-center space-x-4">
            <BtnSubmit Title="Submit" Class="bg-blue-600 hover:bg-blue-800 text-white" />
            <input type="file" onChange={fileChangeHandler} className="w-full mt-4 px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300 cursor-pointer" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
          </div>
        </form>
        <div className="w-full h-[2px] mt-4 bg-black"></div>
        <button className="text-blue-600 underline py-4" onClick={downloadExcelFormat} >Download Excel Format</button>
      </div>

    </section>

  );
}
