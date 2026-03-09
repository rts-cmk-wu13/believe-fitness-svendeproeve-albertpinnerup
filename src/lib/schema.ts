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
