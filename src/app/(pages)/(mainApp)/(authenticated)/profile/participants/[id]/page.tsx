import ProfileCard from '@/components/ProfileCard';
import UserIcon from '@/components/ui/UserIcon';
import getUser from '@/lib/dal/user';
import { ClassesType, UserType } from '@/lib/types';
import { fetchUtil } from '@/lib/utils';

export default async function participantsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const classSingle: ClassesType = await fetchUtil(`classes/${id}`);

    const user: UserType = await getUser();
    console.log(classSingle);

    return (
        <section className='flex flex-col gap-4 px-5'>
            <ProfileCard user={user} />
            <h3 className='font-semibold'>{classSingle.className}</h3>
            {/* Her kan du tilføje indholdet for holdoversigten baseret på id */}
            <p className='font-semibold'>Participants:</p>
            {classSingle.users && classSingle.users?.length > 0 ? (
                classSingle.users?.map((user: UserType) => {
                    if (!(user.userFirstName || user.userLastName)) return;

                    return (
                        <div
                            key={user.id}
                            className='bg-white/80 border border-black py-3 px-6 rounded-full'
                        >
                            <p className='text-primary flex items-center gap-2'>
                                <span>
                                    <UserIcon />
                                </span>
                                {user.userFirstName} {user.userLastName}
                            </p>
                        </div>
                    );
                })
            ) : (
                <h4>There are no participants</h4>
            )}
        </section>
    );
}
