'use server';

import { EmailError, emailSchema } from '@/lib/schema';
import { fetchUtil } from '../utils';

export type NewsletterState = {
    success: boolean;
    errors: string[];
};

export async function subscribeToNewsletter(
    _prevState: NewsletterState,
    formData: FormData
): Promise<NewsletterState> {
    const email = formData.get('email');
    const result = emailSchema.safeParse(email);

    if (!result.success) {
        return { success: false, errors: result.error.issues.map((err) => err.message) };
    }

    console.log('result data: ', result.data);

    const alreadySignedUpRes = await fetchUtil('newsletter');

    const data = await alreadySignedUpRes;

    const alreadySignedUp = data.some((entry: { email: string }) => entry.email === result.data);

    if (!alreadySignedUp) {
        const response = await fetch(`${process.env.API_URL}/newsletter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: result.data }),
        });

        if (!response.ok) {
            return { success: false, errors: ['Could not subscribe to newsletter'] };
        }
    }

    return { success: true, errors: [] };
}
