import React, { useState } from "react";
import { BtnEn } from "../Form";
import { Close } from "../Icons";
import * as XLSX from 'xlsx';
import { data } from "autoprefixer";


const processExcelData = (readerResult, headerArray) => {
	const workbook = XLSX.read(readerResult, { type: "binary" });
	const sheetName = workbook.SheetNames[0];
	const worksheet = workbook.Sheets[sheetName];
	const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: headerArray });
	return jsonData;
}


const Upload = ({ message }) => {
	const [file, setFile] = useState(null);


	const [show, setShow] = useState(false);


	const showModal = () => {
		setShow(true);
		message("Ready to upload");
	}


	const fileChangehandler = (e) => {
		setFile(e.target.files[0]);
	}



	const headerArray = ["id", "name", "dob", "gender", "disability", "disabilityNature", "fmName", "edn", "isMarried", "employeement", "religion", "device", "mobile", "village"];

	
	const uploadHandler = () => {
		const reader = new FileReader();
		reader.onload = (() => {
			const jsonData = processExcelData(reader.result, headerArray);
			const withoutFirstElement = jsonData.slice(1);
			console.log(withoutFirstElement);
		})
		reader.readAsArrayBuffer(file);
	}




	return (
		<>
			<div className={`fixed inset-0 py-16 bg-gray-900 ${show ? 'block' : 'hidden'}  bg-opacity-60 overflow-auto`}>
				<div className="w-11/12 md:w-8/12 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
					<div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
						<h1 className="text-xl font-bold text-blue-600">Upload File</h1>
						<Close Click={() => { setShow(false); Msg("Data ready") }} Size="w-9 h-9" />
					</div>

					<div className="p-6 text-black">
						<input type="file" onChange={(e) => { setFile(e.target.files[0]); }} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" accept="application/javascript" />
						<input type="file" onChange={fileChangehandler} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
					</div>

					<div className="px-6 py-6 flex justify-end items-center border-t border-gray-300">
						<BtnEn Title="Close" Click={() => { setShow(false); message("Data ready") }} Class="bg-red-600 hover:bg-red-800 text-white mr-1" />
						<BtnEn Title="Upload" Click={uploadHandler} Class="bg-blue-600 hover:bg-blue-800 text-white" />
					</div>
				</div>
			</div>
			<button onClick={showModal} className="w-8 h-8 rounded-full hover:bg-gray-200 mr-1 flex justify-center items-center">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
					<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
				</svg>
			</button>
		</>
	)
}
export default Upload;
