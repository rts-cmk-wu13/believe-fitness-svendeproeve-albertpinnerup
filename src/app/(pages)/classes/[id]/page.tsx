import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function classesDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return <h1>{id} classes details</h1>;
}
