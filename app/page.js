"use client"
import React, { useState } from "react";
import { DropdownEn, BtnSubmit } from "@/components/Form";
import { useRouter } from 'next/navigation'

export default function Home() {
  const [unit, setUnit] = useState("");

  const router = useRouter();



  const submitHandler = async (e) => {
    e.preventDefault();
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
          router.push("/dashboard");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="w-screen h-[calc(100vh-50px)] bg-red-100">
      <div className="w-[500px] h-[400px] pt-[150px] mx-auto">
 
          <div className="w-full grid grid-cols-1 gap-4 p-4 bg-gray-200 border-2 border-gray-300 rounded-md shadow-md">
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
              <BtnSubmit Title="Submit" Class="bg-blue-600 hover:bg-blue-800 text-white mt-6" />
            </form>
          </div>
 
      </div>
    </section>
  );
}
