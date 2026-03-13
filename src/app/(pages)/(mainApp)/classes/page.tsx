import ClassesCard from '@/components/ClassCard';
import ClassesCardListClient from '@/components/ClassesCardList';
import { ClassesType, ClassWithRatings, RatingType } from '@/lib/types';
import { fetchUtil } from '@/lib/utils';

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

    const ratingsArr = await Promise.all(
        classesData.map((classItem: ClassesType) => {
            return fetchUtil(`classes/${classItem.id}/ratings`);
        })
    );

    const classesWithRatings: ClassWithRatings[] = classesData.map((classItem, index) => {
        return {
            classItem,
            ratings: ratingsArr[index] ?? [],
        };
    });

    return (
        <>
            <section className='flex flex-col'>
                {randomClass && (
                    <section className='px-5 pb-5'>
                        <ClassesCard
                            title={randomClass.className}
                            imgUrl={randomClass.asset.url}
                            id={randomClass.id}
                            rating={randomRoundedRating}
                            heroCard={true}
                        />
                    </section>
                )}
                <section className=''>
                    <h3 className='px-4'>Classes for You</h3>
                    <ClassesCardListClient classWithRatings={classesWithRatings} />
                </section>
            </section>
        </>
    );
}
