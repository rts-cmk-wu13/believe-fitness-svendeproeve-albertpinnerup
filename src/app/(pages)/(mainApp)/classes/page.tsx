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

    const randomClass: ClassesType = classesData[Math.floor(Math.random() * classesData.length)];
    const randomClassRatingData = await fetchUtil(`classes/${randomClass.id}/ratings`);

    const randomAvg = randomClassRatingData.length
        ? randomClassRatingData.reduce(
              (sum: number, current: RatingType) => sum + current.rating,
              0
          ) / randomClassRatingData.length
        : 0;

    const randomRoundedRating = Math.ceil(randomAvg);

    return (
        <section className='flex flex-col gap-6'>
            {randomClass && (
                <section className='px-5 pb-5'>
                    <ClassesCard
                        title={randomClass.className}
                        imgUrl={randomClass.asset.url}
                        id={randomClass.id}
                        heroCard={true}
                    />
                </section>
            )}
            <section className=''>
                <h3 className='px-4'>Classes for You</h3>
                <div className='grid grid-flow-col auto-cols-[128px] gap-4 p-4 overflow-scroll scrollbar-hide'>
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
                </div>
            </section>
        </section>
    );
}
