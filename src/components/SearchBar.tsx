'use client';

import { SearchIcon } from 'lucide-react';

type Props = {
    query: string;
    setQueryAction: (value: string) => void;
};

export default function SearchBar({ query, setQueryAction }: Props) {
    return (
        <div className='flex items-center gap-2 px-5 rounded-md justify-between py-2'>
            <label htmlFor='search' className='absolute pl-5'>
                <SearchIcon size={16} color='#9E9E9E' />
            </label>
            <input
                type='search'
                name='search'
                id='search'
                value={query}
                placeholder='Seach for classes'
                onChange={(e) => setQueryAction(e.target.value)}
                className=' border relative border-gray-300 leading-6 placeholder-[#9E9E9E] w-full rounded-full py-3 px-5 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
        </div>
    );
}
