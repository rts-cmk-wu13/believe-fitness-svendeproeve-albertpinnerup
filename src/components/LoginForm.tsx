'use client';
import { Button } from '@/components/ui/button';
import { logInAction, logOutAction } from '@/lib/actions/authActions';
import { useActionState, useState, useTransition } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';

const initialState = {
    success: false,
    fieldErrors: {},
    formErrors: [],
};

export default function LogInForm({ isAuthenticated }: { isAuthenticated: boolean }) {
    const [state, formAction, isPending] = useActionState(logInAction, initialState);
    const [_, startTransition] = useTransition();
    const [showModal, setShowModal] = useState(false);

    if (!isAuthenticated) {
        return (
            <section className='flex flex-col w-full px-5 py-4 gap-4'>
                <h5>Log in with your credentials</h5>
                {state.formErrors && state.formErrors.length > 0 && (
                    <p className='text-red-500 text-xl'>{state.formErrors}</p>
                )}

                <form
                    action={formAction}
                    noValidate
                    className='flex flex-col w-full gap-4 justify-between'
                >
                    <input
                        type='text'
                        name='username'
                        placeholder='Enter your username...'
                        className='border border-gray-300 leading-6 w-full rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required
                    />
                    {state.fieldErrors.username?.errors && (
                        <p className='text-red-500 text-sm'>{state.fieldErrors.username.errors}</p>
                    )}

                    <input
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        className='border border-gray-300 leading-6 w-full rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required
                    />
                    <div className='flex items-center gap-2 justify-center'>
                        <label htmlFor='rememberMe'>Remember me?</label>
                        <input type='checkbox' name='rememberMe' id='rememberMe' />
                    </div>

                    <Button type='submit' disabled={isPending}>
                        {isPending ? 'LOGGING IN...' : 'LOG IN'}
                    </Button>
                    <div className='text-center text-[#9E9E9E]'>
                        <p className='text-sm'>Are You not yet a Believer?</p>
                        <p className='text-sm'>
                            <span>
                                <Link href='/signup' className='underline mr-1'>
                                    Sign up here
                                </Link>
                            </span>
                            to start training like a pro.
                        </p>
                    </div>
                </form>
            </section>
        );
    }
    return (
        <section className='h-screen absolute top-0 justify-center flex flex-col w-full px-5 py-4 gap-4'>
            <Button onClick={() => setShowModal(true)}>LOG OUT</Button>
            {showModal &&
                createPortal(
                    <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 flex items-center justify-center z-50'>
                        <div className='bg-background p-6 m-5 rounded-lg flex flex-col items-center gap-4'>
                            <h4 className='text-primary font-medium'>
                                Are you sure you want to log out?
                            </h4>
                            <div className='flex gap-4'>
                                <Button
                                    variant='outline'
                                    className='text-primary'
                                    onClick={() => setShowModal(false)}
                                >
                                    CANCEL
                                </Button>
                                <Button
                                    variant='destructive'
                                    onClick={() => startTransition(() => logOutAction())}
                                >
                                    LOG OUT
                                </Button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </section>
    );
}
