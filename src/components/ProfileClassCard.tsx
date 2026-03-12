'use client';

import { ClassesType } from '@/lib/types';
import { Button } from './ui/button';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import toggleClassParticipation from '@/lib/actions/signUpClassAction';
import Link from 'next/link';

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

    const [isPending, startTransition] = useTransition();
    const router = useRouter();
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
                        <Button disabled={isPending} onClick={onToggle}>
                            LEAVE
                        </Button>
                    </div>
                </section>
            )}
        </>
    );
}
