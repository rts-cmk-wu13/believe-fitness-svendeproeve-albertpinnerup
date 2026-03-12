import SearchClient from '@/components/SearchClient';
import { ClassesType, TrainerType } from '@/lib/types';
import { fetchUtil } from '@/lib/utils';

export default async function SearchPage() {
    const classesData: ClassesType[] = await fetchUtil('classes');
    const ratingsArr = await Promise.all(
        classesData.map((classItem: ClassesType) => {
            return fetchUtil(`classes/${classItem.id}/ratings`);
        })
    );

    console.log(
        'array from method: ',
        Array.from(classesData),
        'vs the classesData array',
        classesData
    );

    const trainersData: TrainerType[] = await fetchUtil('trainers');

    return <SearchClient classes={classesData} ratingsArr={ratingsArr} trainers={trainersData} />;
}
