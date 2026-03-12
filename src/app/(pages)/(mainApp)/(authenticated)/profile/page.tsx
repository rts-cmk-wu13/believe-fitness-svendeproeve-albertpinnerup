import ProfileCard from '@/components/ProfileCard';
import ProfileClassCard from '@/components/ProfileClassCard';
import { checkAuthentication } from '@/lib/auth';
import getUser from '@/lib/dal/user';
import { ClassesType, UserType } from '@/lib/types';
import { redirect } from 'next/navigation';

export default async function profilePage() {
    const isAuthenticated = await checkAuthentication();

    if (!isAuthenticated) {
        redirect('/login');
    }

    const user: UserType = await getUser();

    console.log('user', user);

    return (
        <section className='px-5 flex flex-col gap-4'>
            <ProfileCard user={user} />
            {user.classes.length > 0 &&
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
                })}
        </section>
    );
}
