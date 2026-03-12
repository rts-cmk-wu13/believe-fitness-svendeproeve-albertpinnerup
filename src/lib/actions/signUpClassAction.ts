'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export type ToggleClassParticipationResult = {
    joined: boolean;
};

export default async function toggleClassParticipation({
    classId,
    join,
}: {
    classId: number;
    join: boolean;
}): Promise<{ ok: boolean }> {
    const cookieStore = await cookies();

    const userId = cookieStore.get('userId')?.value;
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!Number.isInteger(classId) || classId <= 0) {
        return { ok: false };
    }

    const method = join ? 'POST' : 'DELETE';

    const response = await fetch(
        `${process.env.API_URL}/users/${userId}/classes/${Number(classId)}`,
        {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            cache: 'no-store',
        }
    );

    // if (!response.ok) {
    //     return {
    //         joined: input.join, // Return the original state if the request fails
    //     };
    // }

    revalidatePath('/profile');
    revalidatePath('/classes');

    return {
        ok: response.ok,
    };
}
