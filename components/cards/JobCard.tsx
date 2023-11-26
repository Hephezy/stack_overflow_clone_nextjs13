import Image from 'next/image';
import Link from 'next/link';

interface JobsProps {
    city: string;
    flag: string;
    state: string;
    country: string;
    image: string;
    title: string;
    description: string;
    employmentType: string;
    minSalary: number;
    maxSalary: number;
    currency: string;
    link: string;
}

const JobCard = ({
    city,
    flag,
    state,
    country,
    image,
    title,
    description,
    employmentType,
    minSalary,
    maxSalary,
    currency,
    link
}: JobsProps) => {

    const renderSalary = () => {
        if (minSalary === null || maxSalary === null || minSalary === undefined || maxSalary === undefined) {
            return <p className='body-medium text-light-500'>Not disclosed</p>;
        } else {
            return <p className='body-medium text-light-500'>{`${minSalary}-${maxSalary} ${currency}`}</p>;
        }
    };

    return (
        <section className='background-light900_dark200 light-border shadow-light100_darknone flex w-full flex-col items-start gap-6 rounded-lg border p-6 sm:flex-row sm:p-8'>
            <div className='flex w-full justify-end sm:hidden'>
                <div className='background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5'>
                    <Image
                        src={flag}
                        alt="country flag"
                        width={20}
                        height={20}
                    />
                    <h1 className='body-medium text-dark400_light700'>{city}</h1>
                    <h2 className='body-medium text-dark400_light700'>{state}</h2>
                    <p className='body-medium text-dark400_light700'>{country}</p>
                </div>
            </div>
            <div className='flex items-center gap-6'>
                <Link href={link} className='background-light800_dark400 relative h-16 w-16 rounded-xl'>
                    <Image
                        src={`${image === null || undefined ? "/assets/images/site-logo.svg" : image}`}
                        alt="company logo"
                        width={170}
                        height={170}
                        className='h-full w-full object-contain p-2'
                    />
                </Link>
            </div>
            <div className='w-full'>
                <div className='flex-between flex-wrap gap-2'>
                    <h2 className='base-semibold text-dark200_light900'>
                        {title}
                    </h2>
                    <div className='hidden sm:flex'>
                        <div className='background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5'>
                            <Image
                                src={flag}
                                alt=''
                                width={20}
                                height={20}
                                className='rounded-full'
                            />
                            <h1 className='body-medium text-dark400_light700'>{city}</h1>
                            <h2 className='body-medium text-dark400_light700'>{state}</h2>
                            <p className='body-medium text-dark400_light700'>{country}</p>
                        </div>
                    </div>
                </div>

                <p className='body-regular text-dark500_light700 mt-2 line-clamp-2 max-w-[90%]'>
                    {description}
                </p>

                <div className='flex-between mt-8 flex-wrap gap-6'>
                    <div className='flex flex-wrap items-center gap-6'>
                        <div className='flex items-center gap-2'>
                            <Image
                                src="/assets/icons/clock-2.svg"
                                alt="clock"
                                width={20}
                                height={20}
                            />
                            <p className='body-medium text-light-500'>{employmentType}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Image
                                src="/assets/icons/currency-dollar-circle.svg"
                                alt="clock"
                                width={24}
                                height={24}
                            />
                            <p className='body-medium text-light-500'>{renderSalary()}</p>
                        </div>
                    </div>
                    <Link
                        href={link}
                        target="_blank"
                        className='flex items-center gap-2'
                    >
                        <p className='primary-text-gradient body-semibold'>View Jobs</p>
                        <Image
                            src="/assets/icons/arrow-up-right.svg"
                            alt="arrow-up"
                            width={20}
                            height={20}
                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default JobCard;