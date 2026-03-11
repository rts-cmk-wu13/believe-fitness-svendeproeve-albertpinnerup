'use client';
import { ClassesType, ClassWithRatings, RatingType } from '@/lib/types';
import { useState } from 'react';
import SearchBar from './SearchBar';
import ClassesCardListClient from './ClassesCardList';

export default function SearchClient({
    classes,
    ratingsArr,
}: {
    classes: ClassesType[];
    ratingsArr: RatingType[][];
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
                  classItem.classDay.toLowerCase().includes(q)
          )
        : classesWithRatings;

    return (
        <>
            <SearchBar query={query} setQueryAction={setQuery} />
            <section className='mt-8'>
                <h3 className='px-4'>Popular classes</h3>
                <ClassesCardListClient classWithRatings={filteredClasses} />
            </section>
        </>
    );
}
