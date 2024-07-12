"use client"
import React, { useEffect, useState } from "react";
import { BtnEn, DropdownEn, TextEn, TextNum } from "@/components/Form";

export default function Home() {
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
      <section className="w-screen h-[calc(100vh-50px)] bg-cover bg-no-repeat" style={{backgroundImage:"url('/images/cmes_hero_page.png')"}}></section>
  );
}
