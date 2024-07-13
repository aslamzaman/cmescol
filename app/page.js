"use client"
import React, { useEffect, useState } from "react";

export default function Home() {
  const [address, setAddress] = useState("");

  const getIp = async () => {
    try {
      const apiUrl = `https://api.ipify.org`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const apiText = await response.text();
        console.log(apiText)
        setAddress(apiText);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getIp();
  }, [])


  return (
    <section className="w-screen h-[calc(100vh-50px)] bg-cover bg-no-repeat" style={{ backgroundImage: "url('/images/cmes_hero_page.png')" }}>
      <div className="pt-2">
        <h1 className="text-center text-2xl text-white">{address}</h1>
      </div>
    </section>
  );
}
