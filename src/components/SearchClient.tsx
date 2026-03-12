'use client';
import { ClassesType, ClassWithRatings, RatingType, TrainerType } from '@/lib/types';
import { useState } from 'react';
import SearchBar from './SearchBar';
import ClassesCardListClient from './ClassesCardList';
import TrainersCard from './TrainersCard';

export default function SearchClient({
    classes,
    ratingsArr,
    trainers,
}: {
    classes: ClassesType[];
    ratingsArr: RatingType[][];
    trainers: TrainerType[];
}) {
    const [query, setQuery] = useState('');

    const q = query.trim().toLowerCase();

    const classesWithRatings: ClassWithRatings[] = classes.map((classItem, index) => {
        return {
            classItem,
            ratings: ratingsArr[index] ?? [],
        };
    });

    const filteredClasses = query
        ? classesWithRatings.filter(
              ({ classItem }) =>
                  classItem.className.toLowerCase().includes(q) ||
                  classItem.classDay.toLowerCase().includes(q) ||
                  classItem.trainer.trainerName.toLowerCase().includes(q) ||
                  classItem.classDescription.toLowerCase().includes(q)
          )
        : classesWithRatings;

    const filteredTrainers = query
        ? trainers.filter((trainer) => trainer.trainerName.toLowerCase().includes(q))
        : trainers;

    return (
        <>
            <SearchBar query={query} setQueryAction={setQuery} />
            <section className='my-8'>
                {filteredClasses.length <= 0 ? (
                    <h3 className='px-5'>
                        Your search did not give any results. Try to search for something else.
                    </h3>
                ) : (
                    <>
                        <h3 className='px-4'>Popular classes</h3>
                        <ClassesCardListClient classWithRatings={filteredClasses} />
                        <section className='px-5 flex flex-col gap-5'>
                            <h4>Popular Trainers</h4>
                            {filteredTrainers.length > 0 &&
                                filteredTrainers.map((trainer: TrainerType) => (
                                    <TrainersCard
                                        key={`${trainer.trainerName}-${trainer.id}`}
                                        trainer={trainer}
                                    />
                                ))}
                        </section>
                    </>
                )}
            </section>
        </>
    );
}
