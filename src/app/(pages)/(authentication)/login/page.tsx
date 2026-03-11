import LogInForm from '@/components/LoginForm';
import { checkAuthentication } from '@/lib/auth';

export default async function LogInPage() {
    const isAuthenticated = await checkAuthentication();

    // if (isAuthenticated) {
    //     redirect('/profile');
    // }

    return <LogInForm isAuthenticated={isAuthenticated} />;
}
