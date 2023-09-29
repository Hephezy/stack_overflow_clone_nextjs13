import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/Search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import Link from "next/link";

const question = [
  {
    _id: "1",
    title: 'How do I use express as a custom server in NextJS',
    tags: [{ _id: "1", name: 'sql' }, { _id: "2", name: 'python' }],
    author: {
      _id: "1",
      name: 'John Doe',
      picture: 'john-doe.jpg',
    },
    upVotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date('2023-09-01T12:00:00.000Z'),
  },
  {
    _id: "2",
    title: 'How to perfectly center a Div in Tailwind CSS',
    tags: [{ _id: "3", name: 'css' }, { _id: "4", name: 'tailwind' }],
    author: {
      _id: "2",
      name: 'Jane Doe',
      picture: 'jane-doe.jpg',
    },
    upVotes: 20,
    views: 300,
    answers: [],
    createdAt: new Date('2023-09-01T12:00:00.000Z'),
  },
  {
    _id: "3",
    title: 'Redux Toolkit not updating state as expected',
    tags: [{ _id: "5", name: 'redux' }, { _id: "6", name: 'react' }],
    author: {
      _id: "3",
      name: 'Sarah Doe',
      picture: 'sarah-doe.jpg',
    },
    upVotes: 59,
    views: 179000,
    answers: [],
    createdAt: new Date('2023-09-01T12:00:00.000Z'),
  }
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link
          href='/ask-questions'
          className="flex justify-end max-sm:w-full"
        >
          <Button
            className="primary-gradient min-h-[40px] px-4 py-3 !text-light-900"
          >
            Ask Questions
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for questions'
          otherClasses='flex-1 '
        />

        <Filter
          filters={HomePageFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
          containerClasses="hidden max-md:flex "
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {question.length > 0
          ? question.map((question) => (
            <QuestionCard 
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upVotes={question.upVotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
          : <NoResult
            title='There’s no question to show'
            description='Be the first to break the silence! 🚀
             Ask a Question and kickstart the discussion.
             our query could be the next big thing others
             learn from. Get involved! 💡'
            link='/ask-questions'
            linkTitle='Ask a Question'
          />
        }
      </div>
    </>
  );
};