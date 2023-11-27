
import JobCard from '@/components/cards/JobCard';
import CountryFilter from '@/components/shared/CountryFilter';
import Pagination from '@/components/shared/Pagination';
import JobSearchBar from '@/components/shared/Search/JobSearchBar';
import { getCountryFilters, getCountryFlags, getUserLocation } from '@/lib/actions/filter.action';
import { getJobs } from '@/lib/actions/job.action';
import { SearchParamsProps } from '@/types';

const Page = async ({ searchParams }: SearchParamsProps) => {
    "use client"
    const countryFilters = await getCountryFilters();
    const userLocation = await getUserLocation();
    const flag = await getCountryFlags({
        country: searchParams.location || userLocation,
    });

    let result;

    if (!searchParams.q && searchParams.location) {
        result = await getJobs({
            query: 'All jobs in',
            location: searchParams.location,
            page: searchParams.page ? +searchParams.page : 1,
        });
    } else if (!searchParams.location) {
        result = await getJobs({
            query: `All Jobs in`,
            location: userLocation,
            page: searchParams.page ? +searchParams.page : 1,
        });
    } else {
        result = await getJobs({
            query: searchParams.q,
            location: searchParams.location,
            page: searchParams.page ? +searchParams.page : 1,
        });
    }

    return (
        <>
            <h1 className="h1-bold text-dark100_light900">Jobs</h1>

            <div className="flex">
                <div className='relative mt-11 flex w-full justify-between gap-5 max-sm:flex-col sm:items-center'>
                    <JobSearchBar
                        route='/jobs'
                        iconPosition='left'
                        imgSrc='/assets/icons/search.svg'
                        placeholder='Job Title, Company, or Keywords'
                        otherClasses='flex-1'
                    />

                    <CountryFilter
                        // @ts-ignore
                        filters={countryFilters}
                        otherClasses='min-h-[56px] sm:min-w-[170px]'
                    />
                </div>
            </div>

            <div className="light-border mb-9 mt-11 flex w-full min-w-full flex-col gap-9 border-b pb-9">
                {result?.data.length > 0
                    ? result?.data.map((item: any) => (
                        <JobCard
                            key={item.job_id}
                            flag={flag}
                            city={item.job_city || ""}
                            state={item.job_state || ""}
                            country={item.job_country}
                            image={item.employer_logo || "/assets/images/site-logo.svg"}
                            title={item.employer_name}
                            description={item.job_description}
                            employmentType={item.job_employment_type}
                            minSalary={item.job_min_salary}
                            maxSalary={item.job_max_salary}
                            currency={item.job_salary_currency}
                            link={item.job_apply_link}
                        />
                    ))
                    : (
                        <p className='paragraph-regular text-dark200_light800 w-full text-center'>
                            Oops! We couldn&apos;t find any jobs at the moment. Please try again later
                        </p>
                    )
                }
            </div>

            <div className="mt-10">
                <Pagination
                    pageNumber={searchParams?.page ? +searchParams.page : 1}
                    isNext={result?.isNext}
                />
            </div>
        </>
    )
}

export default Page;