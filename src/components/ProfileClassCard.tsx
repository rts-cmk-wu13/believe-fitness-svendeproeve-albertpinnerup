'use client';

import { ClassesType } from '@/lib/types';
import { Button } from './ui/button';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import toggleClassParticipation from '@/lib/actions/signUpClassAction';
import Link from 'next/link';
import { logOutAction } from '@/lib/actions/authActions';
import { createPortal } from 'react-dom';

export default function ProfileClassCard({
    classItem,
    initialJoinedState,
    role,
}: {
    classItem: ClassesType;
    initialJoinedState?: boolean;
    role?: 'admin' | 'default';
}) {
    const [joined, setJoined] = useState(initialJoinedState);

    const [showModal, setShowModal] = useState(false);

    const [isPending, startTransition] = useTransition();
    const classId = classItem.id;

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

    if (role === 'admin') {
        return (
            <section className='rounded-2xl border p-5 flex flex-col gap-2 border-[#9E9E9E] '>
                <h3>{classItem.className}</h3>
                <p>
                    {classItem.classDay} - {classItem.classTime}
                </p>
                <div className='flex justify-between'>
                    <Link href={`/profile/participants/${classItem.id}`}>
                        <Button>PARTICPANTS </Button>
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <>
            {joined && (
                <section className='rounded-2xl border p-5 flex flex-col gap-2 border-[#9E9E9E] '>
                    <h3>{classItem.className}</h3>
                    <p>
                        {classItem.classDay} - {classItem.classTime}
                    </p>
                    <div className='flex justify-between'>
                        <Button>
                            <Link href={`/classes/${classItem.id}`}>SHOW CLASS</Link>
                        </Button>
                        <Button disabled={isPending} onClick={() => setShowModal(true)}>
                            LEAVE
                        </Button>
                    </div>
                </section>
            )}
            {showModal &&
                createPortal(
                    <div
                        className='h-screen w-screen fixed top-0 left-0 bg-black/50 flex items-center justify-center z-1000'
                        onClick={() => setShowModal(false)}
                    >
                        <div className='bg-background p-6 m-5 rounded-lg flex flex-col items-center gap-4 z-1000'>
                            <h4 className='text-primary font-medium'>
                                Are you sure you want to leave{' '}
                                <strong>{classItem.className}</strong>?
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
