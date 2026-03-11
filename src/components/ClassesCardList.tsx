'use client';
import { ClassWithRatings, RatingType } from '@/lib/types';
import ClassesCard from './ClassCard';

export default function ClassesCardListClient({
    classWithRatings,
}: {
    classWithRatings: ClassWithRatings[];
}) {
    return (
        <div className='grid grid-flow-col auto-cols-[128px] gap-4 p-4 overflow-scroll scrollbar-hide'>
            {classWithRatings.map(({ classItem, ratings }) => {
                const avgRating = ratings.length
                    ? ratings.reduce(
                          (sum: number, current: RatingType) => sum + current.rating,
                          0
                      ) / ratings.length
                    : 0;

                const roundedRating = Math.ceil(avgRating);

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
        </div>
    );
}
