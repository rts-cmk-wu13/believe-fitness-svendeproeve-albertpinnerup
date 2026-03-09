'use client';

import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button } from './ui/button';
import { NewsletterState, subscribeToNewsletter } from '@/lib/actions/newsletterAction';

const initialState: NewsletterState = {
    success: false,
    errors: [],
};

export default function NewsletterSignUp() {
    const [state, formAction, isPending] = useActionState(subscribeToNewsletter, initialState);

    useEffect(() => {
        if (state.success) {
            toast.success('Du er nu tilmeldt vores nyhedsbrev!');
        }
    }, [state.success]);

    return (
        <section className='flex flex-col  gap-4'>
            <h1>Nyhedsbrev</h1>
            <p>Få direkte besked når vi har sæsonstart eller afholder arrangementer</p>
            <form action={formAction} noValidate className='flex w-full gap-4 justify-between'>
                <input
                    type='email'
                    name='email'
                    placeholder='Indtast din email'
                    className='border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />

                <Button type='submit'>Tilmeld</Button>
            </form>
            {state.errors?.length > 0 && (
                <p className='text-red-500 text-center text-sm mt-1'>{state.errors[0]}</p>
            )}
        </section>
    );
}
