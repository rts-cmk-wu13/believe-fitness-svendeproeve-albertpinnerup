'use client';
import { signUpAction, type SignUpState } from '@/lib/actions/authActions';
import { useActionState } from 'react';
import { Button } from './ui/button';

const initialState: SignUpState = {
    success: false,
    fieldErrors: {},
    formErrors: [],
};

export default function SignUpForm() {
    const [state, formAction, isPending] = useActionState(signUpAction, initialState);

    return (
        <section className='flex flex-col w-full px-5 py-4 gap-4'>
            <h5>Sign up as a new user</h5>
            <form
                action={formAction}
                className='flex flex-col text-lg w-full gap-4 justify-between'
                noValidate
            >
                <input
                    type='text'
                    name='userFirstName'
                    placeholder='Enter your first name...'
                    className='border border-gray-300 leading-6 w-full rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                {state.fieldErrors?.userFirstName?.errors?.[0] && (
                    <p className='text-red-500 text-sm'>
                        {state.fieldErrors.userFirstName.errors[0]}
                    </p>
                )}
                <input
                    type='text'
                    name='userLastName'
                    placeholder='Enter your last name...'
                    className='border border-gray-300 leading-6 w-full rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                {state.fieldErrors?.userLastName?.errors?.[0] && (
                    <p className='text-red-500 text-sm'>
                        {state.fieldErrors.userLastName.errors[0]}
                    </p>
                )}

                <input
                    type='text'
                    name='username'
                    placeholder='Enter a username...'
                    className='border border-gray-300 leading-6 w-full rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                {state.fieldErrors?.username?.errors?.[0] && (
                    <p className='text-red-500 text-sm'>{state.fieldErrors.username.errors[0]}</p>
                )}

                <input
                    type='password'
                    name='password'
                    placeholder='Enter a password...'
                    className='border border-gray-300 leading-6 w-full rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                {state.fieldErrors?.password?.errors?.[0] && (
                    <p className='text-red-500 text-sm'>{state.fieldErrors.password.errors[0]}</p>
                )}

                <input
                    type='password'
                    name='confirmPassword'
                    placeholder='Repeat password...'
                    className='border border-gray-300 leading-6 w-full rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                {state.formErrors && <p className='text-red-500 text-xl'>{state.formErrors}</p>}

                <div className='flex items-center gap-2 justify-center'>
                    <label htmlFor='rememberMe'>Husk mig?</label>
                    <input type='checkbox' name='rememberMe' id='rememberMe' />
                </div>
                <Button type='submit' disabled={isPending}>
                    {isPending ? 'SIGNING UP...' : 'SIGN UP'}
                </Button>
            </form>
        </section>
    );
}
