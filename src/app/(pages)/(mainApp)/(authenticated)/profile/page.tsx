import ProfileCard from '@/components/ProfileCard';
import ProfileClassCard from '@/components/ProfileClassCard';
import { checkAuthentication } from '@/lib/auth';
import getUser from '@/lib/dal/user';
import { ClassesType, UserType } from '@/lib/types';
import { fetchUtil } from '@/lib/utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function profilePage() {
    const isAuthenticated = await checkAuthentication();

    if (!isAuthenticated) {
        redirect('/login');
    }

    const user: UserType = await getUser();
    const allClasses: ClassesType[] = await fetchUtil('classes');

    console.log('all classes', allClasses);
    console.log('user', user);

    return (
        <section className='px-5 flex flex-col gap-4 mb-5'>
            <ProfileCard user={user} />
            {user.role !== 'admin' && user.classes.length > 0 ? (
                user.classes.map((classItem) => {
                    const initialJoinedState = classItem.Roster?.userId === user.id;

                    console.log('initialJoinedState', initialJoinedState);

                    console.log('classItem', classItem.Roster);

                    return (
                        <ProfileClassCard
                            key={`${classItem.className.replace(/ /g, '')}-${classItem.id}`}
                            classItem={classItem}
                            initialJoinedState={initialJoinedState}
                        />
                    );
                })
            ) : (
                <>
                    {user.role !== 'admin' && (
                        <section className='text-center flex-col flex gap-4'>
                            <h3>You're not signed up to any classes...</h3>
                            <h4 className='font-medium'>
                                Go to
                                <span>
                                    <Link
                                        className='text-secondary mx-2 underline'
                                        href={'/classes'}
                                    >
                                        Classes
                                    </Link>
                                    to see start your Believe fitness journey!
                                </span>
                            </h4>
                        </section>
                    )}
                </>
            )}
            {user.role === 'admin' &&
                allClasses.map((classItem) => {
                    return (
                        <ProfileClassCard
                            key={`${classItem.className.replace(/ /g, '')}-${classItem.id}`}
                            classItem={classItem}
                            role={user.role}
                        />
                    );
                })}
        </section>
    );
}
