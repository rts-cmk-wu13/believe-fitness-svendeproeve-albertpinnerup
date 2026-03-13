'use client';
import { Button } from '@/components/ui/button';
import toggleClassParticipation from '@/lib/actions/signUpClassAction';
import { ClassesType, TrainerType, UserType } from '@/lib/types';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import TrainersCard from './TrainersCard';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

const maxRating = 5;

export default function ClassDetailsClient({
    classSingle,
    classId,
    initialJoinedState,
    role,
    rating,
    trainer,
    isAuthenticated,
    user,
}: {
    classSingle: ClassesType;
    classId: ClassesType['id'];
    initialJoinedState: boolean;
    role?: string;
    isAuthenticated: boolean;
    rating: number;
    trainer: TrainerType;
    user?: UserType;
}) {
    const [joined, setJoined] = useState(initialJoinedState);
    const [showModal, setShowModal] = useState(false);

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const disabled = isPending || role === 'admin';

    console.log('user', user);

    const onToggle = () => {
        const nextJoined = !joined;

        console.log('nextJoined', nextJoined);

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
                <h4>Trainer</h4>
                <TrainersCard trainer={trainer} />
                {isAuthenticated ? (
                    <Button
                        className='z-50 w-full mt-auto'
                        variant={'secondary'}
                        disabled={
                            disabled ||
                            (!joined &&
                                classSingle.maxParticipants === classSingle?.users?.length) ||
                            (!joined &&
                                user?.classes.some(
                                    (classItem) => classItem.classDay === classSingle.classDay
                                ))
                        }
                        onClick={joined ? () => setShowModal(true) : onToggle}
                    >
                        {joined ? 'LEAVE CLASS' : 'SIGN UP'}
                    </Button>
                ) : (
                    <Button
                        className='z-50 w-full mt-auto'
                        variant={'secondary'}
                        onClick={() => router.replace('/login')}
                    >
                        {joined ? 'LEAVE CLASS' : 'SIGN UP'}
                    </Button>
                )}
            </section>
            {showModal &&
                createPortal(
                    <div
                        className='h-screen w-screen fixed top-0 left-0 bg-black/50 flex items-center justify-center z-1000'
                        onClick={() => setShowModal(false)}
                    >
                        <div className='bg-background p-6 m-5 rounded-lg flex flex-col items-center gap-4 z-1000'>
                            <h4 className='text-primary font-medium'>
                                Are you sure you want to leave{' '}
                                <strong>{classSingle.className}</strong>?
                            </h4>
                            <div className='flex gap-4'>
                                <Button
                                    variant='outline'
                                    className='text-primary'
                                    onClick={() => {
                                        setShowModal(false);
                                    }}
                                >
                                    CANCEL
                                </Button>
                                <Button variant='destructive' onClick={onToggle}>
                                    LEAVE
                                </Button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}
