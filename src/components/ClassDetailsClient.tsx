'use client';
import { Button } from '@/components/ui/button';
import toggleClassParticipation from '@/lib/actions/signUpClassAction';
import { ClassesType, TrainerType } from '@/lib/types';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useTransition } from 'react';

const maxRating = 5;

export default function ClassDetailsClient({
    classSingle,
    classId,
    initialJoinedState,
    role,
    rating,
    trainer,
}: {
    classSingle: ClassesType;
    classId: ClassesType['id'];
    initialJoinedState: boolean;
    role: string;
    isAuthenticated: boolean;
    rating: number;
    trainer: TrainerType;
}) {
    const [joined, setJoined] = useState(initialJoinedState);

    console.log('role', role);

    const [isPending, startTransition] = useTransition();

    const disabled = isPending || role === 'admin';

    const onToggle = () => {
        const nextJoined = !joined;
        startTransition(async () => {
            setJoined(nextJoined);

            const res = await toggleClassParticipation({ classId, join: nextJoined });
            if (res.ok) {
                setJoined(nextJoined);
            }
        });
    };

    return (
        <>
            <section>
                <div className='relative aspect-410/423'>
                    {/* container */}
                    <div className='w-full h-full p-5 bg-black/40 z-20 relative flex flex-col gap-6'>
                        <h2 className='text-secondary font-bold mt-auto'>
                            {classSingle.className}
                        </h2>
                        <div className='flex gap-1.5 items-center'>
                            {Array.from({ length: maxRating }).map((_, i) => {
                                const filled = rating && i < rating;

                                return (
                                    <Star
                                        key={i}
                                        className={
                                            filled
                                                ? 'fill-secondary text-secondary'
                                                : 'text-secondary'
                                        }
                                        size={11}
                                        strokeWidth={4}
                                    />
                                );
                            })}
                            <p className='text-secondary text-sm ml-2'>
                                {rating}/{maxRating}
                            </p>
                        </div>
                    </div>
                    <Image
                        src={classSingle.asset.url}
                        alt='hero image'
                        fill
                        objectFit='cover'
                        preload
                    />
                </div>
            </section>
            <section className='p-4 flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                    <p className='font-medium'>
                        {classSingle?.classDay} - {classSingle.classTime}
                    </p>
                    <p>{classSingle?.classDescription}</p>
                </div>
                <section className='flex flex-col gap-4'>
                    <h4>Trainer</h4>
                    <div className='flex items-center gap-4'>
                        <Image
                            src={trainer.asset.url}
                            alt={trainer.trainerName}
                            width={88}
                            height={88}
                            className='rounded-xl overflow-hidden aspect-square object-cover object-top'
                        />
                        <p className='font-semibold'>{trainer.trainerName}</p>
                    </div>
                </section>
                <Button
                    className='z-50 w-full mt-auto'
                    variant={'secondary'}
                    disabled={disabled}
                    onClick={onToggle}
                >
                    {joined ? 'LEAVE CLASS' : 'SIGN UP'}
                </Button>
            </section>
        </>
    );
}
