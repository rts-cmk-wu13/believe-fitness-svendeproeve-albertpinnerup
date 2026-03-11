import { ClassesType } from '@/lib/types';
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

    const initialJoinedState =
        classSingle?.users?.some((user) => user.id === Number(userId)) || false;

    return <h1>{id} classes details</h1>;
}
