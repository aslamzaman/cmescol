"use client"
import React, { useState } from "react";
import { DropdownEn, BtnSubmit } from "@/components/Form";
import { useRouter } from 'next/navigation'

export default function Home() {
  const [user, setUser] = useState("");
  const [unit, setUnit] = useState("");
  const [msg, setMsg] = useState("");

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setMsg("Please wait...");
    try {
      const apiIp = `https://api.ipify.org`;
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/col`;
      const response = await fetch(apiIp);
      if (response.ok) {
        const apiText = await response.text();
        console.log(apiText);

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: unit, ip: apiText })
        };

        const responseData = await fetch(apiUrl, requestOptions);
        if (responseData.ok) {
          console.log("Ok");
          sessionStorage.setItem('col_auth', unit);
          sessionStorage.setItem('col_user', user);
          router.push("/dashboard");
        }
      }
      setMsg("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="w-screen h-[calc(100vh-50px)] p-4 border">

      <div id="box" className="w-full lg:w-[500px] mx-auto p-4 border border-gray-200 mt-10 lg:mt-40 bg-gray-100 rounded-md shadow-md">
        <h1 className="w-full py-4 text-2xl text-gray-600 text-center font-bold uppercase underline">cmes col project</h1>
        <p className="w-full py-2 text-red-400 text-center">{msg}</p>
        <form onSubmit={submitHandler}>
          <DropdownEn Title="Select Unit" Change={e => setUnit(e.target.value)} value={unit}>
            <option value="suruj">Suruj</option>
            <option value="gobratola">Gobratola</option>
            <option value="jaldhaka">Jaldhaka</option>
            <option value="deuty">Deuty</option>
            <option value="khaserhat">Khaserhat</option>
            <option value="damkura">Damkura</option>
            <option value="jointiapur">Jointiapur</option>
          </DropdownEn>

          <DropdownEn Title="Select User" Id="user" Change={e => setUser(e.target.value)} Value={user}>
            <option value="Md. Zohurul Haque">Md. Zohurul Haque</option>
            <option value="Zakia Akter">Zakia Akter</option>
            <option value="Aktera Khatun">Aktera Khatun</option>
            <option value="Sabina Yesmin">Sabina Yesmin</option>
            <option value="Md. Habibbur Rahman">Md. Habibbur Rahman</option>
            <option value="Md. Suaibur Rahman">Md. Suaibur Rahman</option>
            <option value="Md. Mizanur Rahman">Md. Mizanur Rahman</option>
            <option value="Md. Sanaullah">Md. Sanaullah</option>
            <option value="Md Shahin  Sarker">Md Shahin  Sarker</option>
          </DropdownEn>


          <BtnSubmit Title="Submit" Class="bg-blue-600 hover:bg-blue-800 text-white mt-6" />
        </form>
      </div>

    </section>

  );
}
