import React from "react";
import { saveAs } from "file-saver";

import { getItems } from "@/lib/LocalDatabase";
import * as XLSX from 'xlsx';


const saveJsonToExcelSheet = (jsonData) => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(jsonData);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // Change "Sheet1" to your desired sheet name
  XLSX.writeFile(workbook, "data.xlsx"); // Change "data.xlsx" to your desired filename
}






const Download = ({ message }) => {


  const downloadHandler11111 = () => {
    let localData = localStorage.getItem("registration");
    if (localData) {
      const blob = new Blob([localData], { type: "application/json" });
      saveAs(blob, `${new Date().toISOString()}-registration.js`);
      message("Data download successfully.");
    } else {
      message("Data not available.");
    }
  }


  const downloadHandler = () => {
    console.log("aslam")
    try {
      let localData = localStorage.getItem("registration");
      if (localData) {

        saveJsonToExcelSheet(JSON.parse(localData));
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }


  return (
    <button onClick={downloadHandler} className="w-8 h-8 rounded-full hover:bg-gray-200 mr-1 flex justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    </button>
  );


};
export default Download;
