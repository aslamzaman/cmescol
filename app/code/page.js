"use client"
import React, { useEffect, useState } from "react";
import { BtnEn, DropdownEn, TextEn, TextNum } from "@/components/Form";

export default function Code() {
  const [sl, setSl] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [learnerid, setLearnerid] = useState("");

  const [msg, setMsg] = useState("");

  useEffect(() => {
    const getCode = localStorage.getItem('logcode');
    const getSl = localStorage.getItem('logsl');
    if (getCode) {
      setCode(getCode);
    } else {
      setCode('CMES-SRJ');
    }
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
      <section id="title" className="w-full">
        <h1 className="py-7 text-4xl text-center font-bold text-gray-400 uppercase">Code Generator</h1>
      </section>


      <section className="w-full">

       <div className="w-10/12 mx-auto mt-4">  {/* center div */}
          <p className="text-red-600 text-center font-bold mt-2">{msg}</p>

          <div className="w-full p-4 bg-red-100 rounded-lg shadow-lg">
            
            <div className="w-full grid grid-cols-2 gap-4">
              <TextEn Title="Code" Id="tbl" Change={e => setCode(e.target.value)} Value={code} Chr={20} />
              <TextNum Title="SL Start" Id="sl" Change={e => setSl(e.target.value)} Value={sl} />
            </div>

            <div className="flex justify-start items-center space-x-4">
              <button onClick={dd} className="text-center mt-5 mx-0.5 px-4 py-1.5 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-blue-700 hover:bg-blue-900 text-white cursor-pointer">Generate</button>
              <button onClick={clearHandler} className="text-center mt-5 mx-0.5 px-4 py-1.5 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-green-700 hover:bg-green-900 text-white cursor-pointer">Clear All</button>
            </div>


            <div className="w-full grid grid-cols-6 gap-4 mt-4">
              <div className="col-span-2">
                <p>Paste List Here</p>
                <textarea rows={1000} id="name" name="name" onChange={e => setName(e.target.value)} value={name} required maxLength={500000} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
              </div>
              <div>
                <p>Learner ID</p>
                <textarea rows={1000} id="learnerid" name="learnerid" onChange={e => setLearnerid(e.target.value)} value={learnerid} required maxLength={500000} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
              </div>
              <div className="col-span-3">
                <p>Participant with ID</p>
                <textarea rows={1000} id="result" name="result" onChange={e => setResult(e.target.value)} value={result} required maxLength={500000} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>

  );
}
