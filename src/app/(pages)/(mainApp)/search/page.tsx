import SearchClient from '@/components/SearchClient';
import { ClassesType, TrainerType } from '@/lib/types';
import { fetchUtil } from '@/lib/utils';

export default async function SearchPage() {
    const classesData: ClassesType[] = await fetchUtil('classes');
    const ratingsArr = await Promise.all(
        Array.from(classesData, (classItem: ClassesType) => {
            return fetchUtil(`classes/${classItem.id}/ratings`);
        })
    );

    const trainersData: TrainerType[] = await fetchUtil('trainers');

    return <SearchClient classes={classesData} ratingsArr={ratingsArr} trainers={trainersData} />;
}
