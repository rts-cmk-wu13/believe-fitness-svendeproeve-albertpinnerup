import UserIcon from '@/components/ui/UserIcon';
import { ClassesType, UserType } from '@/lib/types';
import { fetchUtil } from '@/lib/utils';

export default async function HoldoversigtPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const classSingle: ClassesType = await fetchUtil(`classes/${id}`);

    console.log(classSingle);

    return (
        <section className='flex flex-col gap-4 px-4 py-8'>
            <h3 className='font-medium'>{classSingle.className}</h3>
            {/* Her kan du tilføje indholdet for holdoversigten baseret på id */}
            <p>Deltagere:</p>
            {classSingle.users?.map((user: UserType) => (
                <div key={user.id} className='bg-white/80 py-2 px-4 rounded-lg'>
                    <p className='text-primary flex items-center gap-2'>
                        <span>
                            <UserIcon />
                        </span>
                        {user.userFirstName} {user.userLastName}
                    </p>
                </div>
            ))}
        </section>
    );
}
