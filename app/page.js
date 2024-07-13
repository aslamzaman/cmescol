"use client"
import React, { useEffect } from "react";

export default function Home() {

  const getIp = async () => {
    try {
      const apiUrl = `https://api.ipify.org`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const apiText = await response.text();
        console.log(apiText)
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getIp();
  }, [])


  return (
    <section className="w-screen h-[calc(100vh-50px)] bg-cover bg-no-repeat" style={{ backgroundImage: "url('/images/cmes_hero_page.png')" }}></section>
  );
}
