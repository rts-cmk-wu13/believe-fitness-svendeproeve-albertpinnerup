'use server';

import { cookies } from 'next/headers';
import { createAccessToken } from '../auth';
import { redirect } from 'next/navigation';
import { z } from 'zod/v4';
import { SignUpErrors, LogInErrors, logInSchema, userSchema } from '../schema';

export type SignUpState = {
    success: boolean;
    fieldErrors: SignUpErrors;
    formErrors?: string[];
};

export async function signUpAction(
    _prevState: SignUpState,
    formData: FormData
): Promise<SignUpState> {
    const cookieStore = await cookies();

    const rawValues = Object.fromEntries(formData.entries());
    const values = {
        username: rawValues.username,
        password: rawValues.password,
        userFirstName: rawValues.userFirstName,
        userLastName: rawValues.userLastName,
        rememberMe: rawValues.rememberMe,
    };

    const result = userSchema.safeParse(values);

    console.log('Form values:', values);
    console.log('Zod validation result:', result);
    const formErrors: string[] = [];

    if (!result.success) {
        const zodError = z.treeifyError(result.error);

        console.log('Zod validation error:', zodError);
        if (values.password !== formData.get('confirmPassword')) {
            formErrors.push('Passwords do not match');
        }

        return {
            success: false,
            fieldErrors: {
                username: zodError.properties?.username,
                password: zodError.properties?.password,
                userFirstName: zodError.properties?.userFirstName,
                userLastName: zodError.properties?.userLastName,
            },
            formErrors: formErrors,
        };
    }

    if (values.password !== formData.get('confirmPassword')) {
        formErrors.push('Passwords do not match');
    }

    if (formErrors.length > 0) {
        return {
            success: false,
            fieldErrors: {},
            formErrors,
        };
    }

    console.log('Validation result:', result);

    const response = await fetch(`${process.env.API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: result.data.username,
            password: result.data.password,
            userFirstName: result.data.userFirstName,
            userLastName: result.data.userLastName,
        }).toString(),
    });

    if (!response.ok) {
        const errorData = await response.json();
        return {
            success: false,
            fieldErrors: {},
            formErrors: errorData.errors || ['Signup failed'],
        };
    }

    if (result.data.rememberMe) {
        const { accessToken, userId, expiresIn } = await createAccessToken(
            result.data.username,
            result.data.password
        );

        const validUntil = new Date(expiresIn);

        cookieStore.set('accessToken', accessToken, {
            expires: validUntil,
        });
        cookieStore.set('userId', String(userId), {
            expires: validUntil,
        });

        redirect('/profile');
    } else {
        redirect('/login');
    }
}

export type LogInState = {
    success: boolean;
    fieldErrors: LogInErrors;
    formErrors?: string[];
};

export async function logInAction(_prevState: LogInState, formData: FormData): Promise<LogInState> {
    const cookieStore = await cookies();

    // const username = formData.get('username') as string;
    // const password = formData.get('password') as string;

    const values = Object.fromEntries(formData.entries());
    const result = logInSchema.safeParse(values);

    if (!result.success) {
        const zodError = z.treeifyError(result.error);

        console.log('Zod validation error:', zodError.properties?.rememberMe);
        return {
            success: false,
            fieldErrors: {
                username: zodError.properties?.username,
                password: zodError.properties?.password,
            },
            formErrors: [],
        };
    }

    const rememberMe = result.data.rememberMe;
    console.log(rememberMe);

    try {
        const { accessToken, userId, expiresIn } = await createAccessToken(
            result.data.username,
            result.data.password
        );

        const validUntil = new Date(expiresIn);
        if (rememberMe) {
            cookieStore.set('accessToken', accessToken, {
                path: '/',
                expires: validUntil,
            });
            cookieStore.set('userId', String(userId), {
                path: '/',
                expires: validUntil,
            });
        } else {
            cookieStore.set('accessToken', accessToken, { path: '/' });
            cookieStore.set('userId', String(userId), { path: '/' });
        }
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            fieldErrors: {},
            formErrors: ['Invalid username or password'],
        };
    }

    redirect('/profile');
}

export async function logOutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('userId');
    redirect('/dashboard');
}
