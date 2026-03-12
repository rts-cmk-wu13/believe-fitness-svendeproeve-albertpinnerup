import { UserType } from '@/lib/types';
import UserIcon from '@/components/ui/UserIcon';

export default function ProfileCard({ user }: { user: UserType }) {
    return (
        <section className='flex items-center gap-4'>
            <div className='bg-secondary rounded-full inline-flex p-3.5'>
                <UserIcon fontSize={32} />
            </div>
            <section>
                <h5>
                    {user.userFirstName} {user.userLastName}
                </h5>
                <p className='text-sm'>{user.role === 'default' ? 'Member' : user.role}</p>
            </section>
        </section>
    );
}
