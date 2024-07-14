"use client"
import React, { useEffect, useState } from "react";

export default function Home() {



  useEffect(() => {

    const getIp = async () => {
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
            body: JSON.stringify({ user: "col", ip: apiText })
          };

          const responseData = await fetch(apiUrl, requestOptions);
          if (responseData.ok) {
            console.log("Ok");
          }

         
        }
      } catch (err) {
        console.log(err);
      }
    }

    getIp();
  }, [])


  return (
    <section className="w-screen h-[calc(100vh-50px)] bg-cover bg-no-repeat" style={{ backgroundImage: "url('/images/cmes_hero_page.png')" }}>
    </section>
  );
}
