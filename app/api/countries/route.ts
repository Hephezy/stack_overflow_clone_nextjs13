import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
   try {
     const response = await fetch("https://restcountries.com/v3.1/name/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const responseData = await response.json();
    console.log({responseData});
    return NextResponse.json({ responseData });
   } catch (error: any) {
    return NextResponse.json({ error: error.message });
   }
}