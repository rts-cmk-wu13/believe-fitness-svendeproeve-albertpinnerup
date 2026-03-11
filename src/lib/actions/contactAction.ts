'use server';
import { z } from 'zod/v4';
import { ContactFormErrors, contactFormSchema } from '../schema';

export type ContactState = {
    success: boolean;
    errors: ContactFormErrors;
};

export default async function contactAction(
    _prevState: ContactState,
    formData: FormData
): Promise<ContactState> {
    const values = Object.fromEntries(formData.entries());
    const result = contactFormSchema.safeParse(values);

    if (!result.success) {
        const zodError = z.treeifyError(result.error);

        console.log('Zod validation error:', zodError);
        return {
            success: false,
            errors: {
                name: zodError.properties?.name,
                email: zodError.properties?.email,
                message: zodError.properties?.message,
            },
        };
    }

    console.log('Validation result:', result);

    await fetch(`${process.env.API_URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: result.data.name,
            email: result.data.email,
            message: result.data.message,
        }),
    });

    return { success: true, errors: {} };
}
