import { z } from 'zod/v4';

type FieldError = {
    errors: string[];
};

export const emailSchema = z.email({ message: 'Invalid email address' });

export type EmailError = {
    email?: FieldError;
};

export const contactFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: emailSchema,
    message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type ContactFormErrors = {
    name?: FieldError;
    email?: FieldError;
    message?: FieldError;
};

export const userSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
    password: z.string().min(4, { message: 'Password must be at least 6 characters' }),
    userFirstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
    userLastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
    rememberMe: z.coerce.boolean().optional(),
});

export type UserFormData = z.infer<typeof userSchema>;

export type SignUpErrors = {
    username?: FieldError;
    password?: FieldError;
    userFirstName?: FieldError;
    userLastName?: FieldError;
};

export const logInSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
    password: z.string().min(4, { message: 'Password must be at least 6 characters' }),
    rememberMe: z.coerce.boolean().optional(),
});

export type LogInData = z.infer<typeof logInSchema>;

export type LogInErrors = {
    username?: FieldError;
    password?: FieldError;
};
