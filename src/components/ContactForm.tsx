'use client';

import contactAction, { ContactState } from '@/lib/actions/contactAction';
import { useActionState, useEffect } from 'react';
import { Button } from './ui/button';
import { toast } from 'react-toastify';

const initialState: ContactState = {
    success: false,
    errors: {},
};

export default function ContactForm() {
    const [state, formAction, isPending] = useActionState(contactAction, initialState);

    console.log('Current form state:', state);

    useEffect(() => {
        if (state.success) {
            toast.success('Your message has been sent successfully!');
        }
    }, [state.success]);

    return (
        <section className='flex flex-col  gap-4'>
            <h3>Contact us</h3>
            <p>Ask us anything about Believe Fitness!</p>
            <form
                action={formAction}
                className='flex flex-col w-full gap-4 justify-between'
                noValidate
            >
                <input
                    type='text'
                    name='name'
                    placeholder='Enter your name...'
                    className='border border-gray-300 leading-6 w-full rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                {state.errors?.name?.errors?.[0] && (
                    <p className='text-red-500 text-sm'>{state.errors.name.errors[0]}</p>
                )}
                <input
                    type='email'
                    name='email'
                    placeholder='Enter your email...'
                    className='border border-gray-300 w-full rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                {state.errors?.email?.errors?.[0] && (
                    <p className='text-red-500 text-sm'>{state.errors.email.errors[0]}</p>
                )}
                <textarea
                    name='message'
                    placeholder='Enter your Message...'
                    className='border border-gray-300 w-full min-h-24 rounded-[24px] py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                {state.errors?.message?.errors?.[0] && (
                    <p className='text-red-500 text-sm'>{state.errors.message.errors[0]}</p>
                )}
                <Button type='submit' disabled={isPending} className='w-full'>
                    {isPending ? 'SENDING...' : 'SEND MESSAGE'}
                </Button>
            </form>
        </section>
    );
}
