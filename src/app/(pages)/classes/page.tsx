import ClassesCard from '@/components/ClassCard';
import { ClassesType } from '@/lib/types';
import { fetchUtil } from '@/lib/utils';

type RatingType = {
    id: number;
    rating: number;
    userId: number;
    classId: number;
};

export default async function ClassesPage() {
    const classesData: ClassesType[] = await fetchUtil('classes');

    return (
        <section className='grid grid-flow-col gap-4 p-4 overflow-scroll scrollbar-hide'>
            {classesData.map(async (classItem: ClassesType) => {
                const ratingsData = await fetchUtil(`classes/${classItem.id}/ratings`);

                console.log('ratings', ratingsData);

                const avgRating = ratingsData.length
                    ? ratingsData.reduce(
                          (sum: number, current: RatingType) => sum + current.rating,
                          0
                      ) / ratingsData.length
                    : 0;

                const roundedRating = Math.ceil(avgRating);

                console.log('average rating', avgRating);

                return (
                    <ClassesCard
                        key={classItem.className + classItem.id}
                        title={classItem.className}
                        imgUrl={classItem.asset.url}
                        id={classItem.id}
                        rating={roundedRating}
                    />
                );
            })}
        </section>
    );
}
