import LogInForm from '@/components/LoginForm';
import { checkAuthentication } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LogInPage() {
    const isAuthenticated = await checkAuthentication();

    if (isAuthenticated) {
        redirect('/profile');
    }

    return <LogInForm isAuthenticated={isAuthenticated} />;
}
