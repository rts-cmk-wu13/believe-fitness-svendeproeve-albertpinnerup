'use client';
import { Button } from '@/components/ui/button';
import { ClassesType } from '@/lib/types';
import Image from 'next/image';
import { useState, useTransition } from 'react';

export default function ClassDetailsClient({
    classSingle,
    classId,
    initialJoinedState,
    role,
}: {
    classSingle: ClassesType;
    classId: ClassesType['id'];
    initialJoinedState: boolean;
    age: number;
    role: string;
}) {
    const [joined, setJoined] = useState(initialJoinedState);

    const [isPending, startTransition] = useTransition();

    const disabled = isPending || role === 'admin' || !joined;

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
        <main>
            <div className='relative flex flex-col p-7 items-end justify-end aspect-4/5'>
                <Button
                    className='z-50 text-lg font-normal px-8 py-4'
                    variant={'secondary'}
                    disabled={disabled}
                    onClick={onToggle}
                >
                    {joined ? 'Forlad aktivitet' : 'Tilmeld'}
                </Button>

                <Image
                    src={classSingle?.asset?.url}
                    alt={`${classSingle?.className} Image`}
                    fill
                    objectFit='cover'
                />
            </div>
            <section className='p-4'>
                <h3 className='font-medium'>
                    {classSingle?.classDay} - {classSingle.classTime}
                </h3>
                <p>{classSingle?.classDescription}</p>
            </section>
        </main>
    );
}
