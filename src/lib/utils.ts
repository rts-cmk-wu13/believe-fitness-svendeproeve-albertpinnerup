import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function fetchUtil(query: string, method?: string, id?: string) {
    const url = id ? `${process.env.API_URL}/${query}/${id}` : `${process.env.API_URL}/${query}`;

    const response = await fetch(url, {
        method: method ? method : 'GET',
    });

    const data = await response.json();

    return data;
}
