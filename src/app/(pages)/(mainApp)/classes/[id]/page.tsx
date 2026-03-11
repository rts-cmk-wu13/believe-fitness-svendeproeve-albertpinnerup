import ClassDetailsClient from '@/components/ClassDetailsClient';
import { checkAuthentication } from '@/lib/auth';
import getUser from '@/lib/dal/user';
import { ClassesType, RatingType, TrainerType } from '@/lib/types';
import { fetchUtil } from '@/lib/utils';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function classesDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const cookieStore = await cookies();

    const classId = Number(id);

    if (!Number.isInteger(classId) || classId <= 0) {
        notFound();
    }

    const classSingle: ClassesType = await fetchUtil(`classes/${String(classId)}`);

    console.log('single class', classSingle);

    if (!classSingle?.id) {
        notFound();
    }
    const userId = cookieStore.get('userId')?.value;

    /* const user = await getUser(); */

    const isAuthenticated = await checkAuthentication();

    let user;

    if (isAuthenticated) {
        user = await getUser();
    } else {
        user = 'default';
    }

    const initialJoinedState =
        classSingle?.users?.some((user) => user.id === Number(userId)) || false;

    const ratingsData = await fetchUtil(`classes/${classId}/ratings`);

    const avgRating = ratingsData.length
        ? ratingsData.reduce((sum: number, current: RatingType) => sum + current.rating, 0) /
          ratingsData.length
        : 0;

    const roundedRating = Math.ceil(avgRating);

    const trainer: TrainerType = await fetchUtil(`trainers/${classSingle.trainerId}`);

    return (
        <ClassDetailsClient
            classSingle={classSingle}
            classId={classId}
            initialJoinedState={initialJoinedState}
            role={user.role}
            isAuthenticated={isAuthenticated}
            rating={roundedRating}
            trainer={trainer}
        />
    );
}
