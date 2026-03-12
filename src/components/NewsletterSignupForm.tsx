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
            toast.success('You have successfully subscribed to our newsletter!');
        }
    }, [state.success]);

    return (
        <section className='flex flex-col  gap-4'>
            <h3>Sign up for our newsletter</h3>
            <p>Sign up to receive the latest news and  announcements from Believe Fitness</p>
            <form action={formAction} noValidate className='flex w-full gap-4 justify-between'>
                <input
                    type='email'
                    name='email'
                    placeholder='Enter your email...'
                    className='border border-gray-300 w-full rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />

                <Button type='submit' className='font-semibold'>
                    SIGN UP
                </Button>
            </form>
            {state.errors?.length > 0 && (
                <p className='text-red-500 text-sm mt-1'>{state.errors[0]}</p>
            )}
        </section>
    );
}
