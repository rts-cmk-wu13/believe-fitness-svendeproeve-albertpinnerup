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
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    userFirstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
    userLastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
    rememberMe: z.boolean().optional(),
    role: z.enum(['default', 'admin'], {
        message: 'Role must be either default or admin',
    }),
});

export type UserFormData = z.infer<typeof userSchema>;

export type SignUpErrors = {
    username?: FieldError;
    password?: FieldError;
    userFirstName?: FieldError;
    userLastName?: FieldError;
    role?: FieldError;
};
