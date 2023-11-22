"use client"

import { downVoteAnswer, upVoteAnswer } from '@/lib/actions/answer.action';
import { viewQuestion } from '@/lib/actions/interaction.action';
import { downVoteQuestion, upVoteQuestion } from '@/lib/actions/question.action';
import { toggleSaveQuestions } from '@/lib/actions/user.action';
import { formatAndDivideNumber } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from '../ui/use-toast';

interface Props {
    type: string;
    itemId: string;
    userId: string;
    upVotes: number;
    hasupVoted: boolean;
    downVotes: number;
    hasdownVoted: boolean;
    hasSaved?: boolean;
}

const Votes = ({
    type,
    itemId,
    userId,
    upVotes,
    hasupVoted,
    downVotes,
    hasdownVoted,
    hasSaved
}: Props) => {

    const pathName = usePathname();
    const router = useRouter();

    const handleSave = async () => {
      await toggleSaveQuestions({
        userId: JSON.parse(userId),
        questionId: JSON.parse(itemId),
        path: pathName
      })

        return toast({
            title: `Question ${!hasSaved ? "saved in" : "removed from"} your collection`,
            variant: !hasSaved ? 'default' : 'destructive'
        });
    }

    const handleVote = async (action: string) => {
        if (!userId) {
            return toast({
                title: "Please log in",
                description: "You must be logged in to perform this action"
            });
        }

        if (action === 'upvote') {
            if (type === 'Question') {
                await upVoteQuestion({
                    questionId: JSON.parse(itemId),
                    userId: JSON.parse(userId),
                    hasupVoted,
                    hasdownVoted,
                    path: pathName,
                })
            } else if (type === 'Answer') {
                await upVoteAnswer({
                    answerId: JSON.parse(itemId),
                    userId: JSON.parse(userId),
                    hasupVoted,
                    hasdownVoted,
                    path: pathName,
                })
            }

            return toast({
                title: `Upvote ${!hasupVoted ? "Successful" : "Removed"}`,
                variant: !hasupVoted ? 'default' : 'destructive'
            });
        }

        if (action === 'downvote') {
            if (type === 'Question') {
                await downVoteQuestion({
                    questionId: JSON.parse(itemId),
                    userId: JSON.parse(userId),
                    hasupVoted,
                    hasdownVoted,
                    path: pathName,
                })
            } else if (type === 'Answer') {
                await downVoteAnswer({
                    answerId: JSON.parse(itemId),
                    userId: JSON.parse(userId),
                    hasupVoted,
                    hasdownVoted,
                    path: pathName,
                })
            }

            return toast({
                title: `Downvote ${!hasdownVoted ? "Successful" : "Removed"}`,
                variant: !hasdownVoted ? 'default' : 'destructive'
            });

        }
    }

    useEffect(() => {
      viewQuestion({
        questionId: JSON.parse(itemId),
        userId: userId ? JSON.parse(userId) : undefined,
      })

      alert('Viewed'); 
    }, [itemId, userId, pathName, router]);

    return (
        <div className='flex gap-5'>
            <div className='flex-center gap-2.5'>
                <div className='flex-center gap-1.5'>
                    <Image
                        src={hasupVoted
                            ? '/assets/icons/upvoted.svg'
                            : '/assets/icons/upvote.svg'
                        }
                        alt='upvote'
                        width={18}
                        height={18}
                        className='cursor-pointer'
                        onClick={() => handleVote('upvote')}
                    />
                    <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
                        <p className='subtle-medium text-dark400_light900'>
                            {formatAndDivideNumber(upVotes)}
                        </p>
                    </div>
                </div>

                <div className='flex-center gap-1.5'>
                    <Image
                        src={hasdownVoted
                            ? '/assets/icons/downvoted.svg'
                            : '/assets/icons/downvote.svg'
                        }
                        alt='downvote'
                        width={18}
                        height={18}
                        className='cursor-pointer'
                        onClick={() => handleVote('downvote')}
                    />
                    <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
                        <p className='subtle-medium text-dark400_light900'>
                            {formatAndDivideNumber(downVotes)}
                        </p>
                    </div>
                </div>
            </div>

            {type === 'Question' && (
                <Image
                    src={hasSaved
                        ? '/assets/icons/star-filled.svg'
                        : '/assets/icons/star-red.svg'
                    }
                    alt='star'
                    width={18}
                    height={18}
                    className='cursor-pointer'
                    onClick={handleSave}
                />)}
        </div>
    )
}

export default Votes;