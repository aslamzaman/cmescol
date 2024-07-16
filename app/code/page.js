"use client"
import React, { useEffect, useState } from "react";
import { BtnEn, DropdownEn, TextEn, TextNum } from "@/components/Form";

const unitShortName = [
  { id: 'suruj', name: 'SRJ' },
  { id: 'gobratola', name: 'GOB' },
  { id: 'jaldhaka', name: 'JAL' },
  { id: 'deuty', name: 'DUT' },
  { id: 'khaserhat', name: 'KHT' },
  { id: 'damkura', name: 'DMK' },
  { id: 'jointiapur', name: 'JNP' }
]





export default function Code() {
  const [sl, setSl] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [learnerid, setLearnerid] = useState("");

  const [msg, setMsg] = useState("");

  useEffect(() => {
    const user = sessionStorage.getItem('col_auth');
    const getShortName = unitShortName.find(u => u.id === user);
    if (getShortName) {
      setCode(`CMES-${getShortName.name}`);
    }
    const getSl = localStorage.getItem('logsl');
    //---------------------------------------
    if (getSl) {
      setSl(getSl);
    } else {
      setSl('181');
    }
  }, [])



  const dd = () => {
    if (name === "") {
      setMsg("** Please paste your participant list. **");
      return false;
    }
    localStorage.setItem('logcode', code);
    localStorage.setItem('logsl', sl);
    //----------------------------------
    const s = name.split('\n');
    let x = '';
    let x1 = '';
    for (let i = 0; i < s.length; i++) {
      if (i === (s.length - 1)) {
        x = x + `${code}-0${i + parseInt(sl)} ${s[i]}`;
        x1 = x1 + `${code}-0${i + parseInt(sl)}`;
      } else {
        x = x + `${code}-0${i + parseInt(sl)} ${s[i]}\n`;
        x1 = x1 + `${code}-0${i + parseInt(sl)}\n`;
      }
    }
    setResult(x);
    setLearnerid(x1);
    console.log(x)
  }


  const clearHandler = () => {
    setResult("");
    setLearnerid("");
    setName("");
  }




  return (
    <>
      <div id="title" className="w-full">
        <h1 className="py-4 text-3xl text-center font-bold text-gray-400 uppercase">Code Generator</h1>
        <p className="text-red-600 text-center font-bold">{msg}</p>
      </div>




      <div className="w-ful px-4 mx-auto">
        <div className="w-full p-1 bg-red-100 rounded-lg shadow-lg">

          <div className="flex justify-start items-center space-x-4">
            <button onClick={dd} className="text-center mt-5 mx-0.5 px-4 py-1.5 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-blue-700 hover:bg-blue-900 text-white cursor-pointer">Generate</button>
            <button onClick={clearHandler} className="text-center mt-5 mx-0.5 px-4 py-1.5 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-green-700 hover:bg-green-900 text-white cursor-pointer">Clear All</button>
            <div>
              <TextNum Title="SL Start" Id="sl" Change={e => setSl(e.target.value)} Value={sl} />
            </div>
          </div>


          <div className="w-full flex text-xs lg:text-base pt-4">
            <div className="w-3/12">
              <p>Paste List Here</p>
              <textarea rows={1000} id="name" name="name" onChange={e => setName(e.target.value)} value={name} required maxLength={500000} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
            </div>

            <div className="w-4/12">
              <p>Learner ID</p>
              <textarea rows={1000} id="learnerid" name="learnerid" onChange={e => setLearnerid(e.target.value)} value={learnerid} required maxLength={500000} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
            </div>
            <div className="w-5/12">
              <p>Participant with ID</p>
              <textarea rows={1000} id="result" name="result" onChange={e => setResult(e.target.value)} value={result} required maxLength={500000} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
            </div>
          </div>

        </div>
      </div>

    </>

  );
}
