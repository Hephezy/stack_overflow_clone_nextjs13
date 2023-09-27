import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import RenderTag from './RenderTag';

const hotQuestion = [
    { _id: 1, title: 'How do I use express as a custom server in NextJS' },
    { _id: 2, title: 'Cascading Deletes in SQL Alchemy' },
    { _id: 3, title: 'How to perfectly center a Div in Tailwind CSS' },
    { _id: 4, title: 'How do I use express as a custom server in NextJS' },
    { _id: 5, title: 'Redux Toolkit not updating state as expected' },
];

const popularTags = [
    { _id: 1, name: 'Javascript', totalQuestions: 5 },
    { _id: 2, name: 'NextJS', totalQuestions: 2 },
    { _id: 3, name: 'React', totalQuestions: 3 },
    { _id: 4, name: 'Redux', totalQuestions: 1 },
    { _id: 5, name: 'Remix', totalQuestions: 4 },
];

const RightSideBar = () => {

    return (
        <section className='background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden'>
            <div>
                <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
                <div className='mt-7 flex w-full flex-col gap-[30px]'>
                    {hotQuestion.map((question) => (
                        <Link
                            href={`/questions/${question._id}`}
                            key={question._id}
                            className='flex cursor-pointer items-center justify-between gap-7 '
                        >
                            <p className='body-medium text-dark500_light700'>{question.title}</p>
                            <Image
                                src="/assets/icons/chevron-right.svg"
                                alt='chevron right'
                                width={20}
                                height={20}
                                className='invert-colors'
                            />
                        </Link>
                    ))}
                </div>
            </div>
            <div className='mt-12 '>
                <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
                <div className='mt-7 flex flex-col gap-4 '>
                    {popularTags.map((tag) => (
                        <RenderTag
                          key={tag._id}
                          _id={tag._id}
                          name={tag.name}
                          totalQuestions={tag.totalQuestions}
                          showCount
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RightSideBar;