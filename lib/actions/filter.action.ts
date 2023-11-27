"use server";

export async function getCountryFilters() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();

        const name: string[] = responseData.map((item: any) => item.name);

        return name;
    } catch (error) {
        console.log(error);
    }
}

interface FlagProps {
  country: string;
}

export async function getCountryFlags(params: FlagProps) {
  try {
    const { country } = params;

    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}?fullText=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();

    const countryFlag = responseData[0].flags.svg;

    return countryFlag;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserLocation() {
  "use client"
  try {
    const response = await fetch("http://ip-api.com/json/?fields=country", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseLocation = await response.json();
    const location = responseLocation.country;
    console.log({location});

    return location;
  } catch (error) {
    console.log(error);
  }
}

// export async function getUsersLocation() {
//   try {
//     const response = await fetch(
//       `https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.NEXT_LOCATION_API_KEY}`,
//       {
//         method: "GET",
//       }
//     );

//       const responseLocation = await response.json();
//       const location = responseLocation.country.name;

//       console.log({location});

//       return location;
//   } catch (error) {
//     console.log(error);
//   }
// }