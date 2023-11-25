"use server";

import { JobFilterParams } from "./shared.types";

export async function getJobs(params: JobFilterParams) {
    try {
        // Fetch data
        const { query, page = 1, location } = params;

        const urlQuery = `${query} ${location}`

        const url = `https://jsearch.p.rapidapi.com/search?query=${urlQuery}&page=${page}&num_page=5`;

        const requestHeaders = {
          "X-RapidAPI-Key": process.env.NEXT_RAPIDAPI_KEY,
          "X-RapidAPI-Host": process.env.NEXT_RAPIDAPI_HOST,
        };

        const response = await fetch(url, {
          method: "GET",
          // @ts-ignore
          headers: requestHeaders,
        });

        const responseData = await response.json();
        const data = responseData.data;

        const isNext = responseData.data.length > 9;

        return { data, isNext};
    } catch (error) {
        console.log(error);
    }
}
