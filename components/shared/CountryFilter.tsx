"use client"

import React from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { formUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface Props {
    filters: {
        common: string;
    }[] | undefined;
    otherClasses?: string;
    containerClasses?: string;
}

const CountryFilter = ({ filters, otherClasses, containerClasses }: Props) => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const paramFilter = searchParams.get('location');

    const handleUpdateParams = (value: string) => {
        if(paramFilter === value) {
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'location',
                value: null
            });
            router.push(newUrl, { scroll: false });
        } else {
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'location',
                value
            });
            router.push(newUrl, { scroll: false });
        }
    }

    return (
        <div className={`relative ${containerClasses}`}>
            <Select
                onValueChange={handleUpdateParams}
                defaultValue={paramFilter || undefined}
            >
                <SelectTrigger className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}>
                    <div className='line-clamp-1 flex flex-1 gap-3 text-left'>
                        <Image
                            src="/assets/icons/location.svg"
                            alt="location"
                            width={20}
                            height={20}
                        />
                        <SelectValue placeholder="Select a Country" />
                    </div>
                </SelectTrigger>
                <SelectContent className='text-dark500_light700 small-regular max-h-[300px] border-none bg-light-900 dark:bg-dark-300'>
                    <SelectGroup>
                        {filters?.map((item: any) => (
                            <SelectItem
                                key={item?.common}
                                value={item?.common}
                                className='max-w-[200px] cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400'
                            >
                                {item?.common}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default CountryFilter;