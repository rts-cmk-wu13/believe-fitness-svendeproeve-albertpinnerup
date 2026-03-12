import SignUpForm from '@/components/SignupForm';
import { checkAuthentication } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
    const isAuthenticated = await checkAuthentication();

    if (isAuthenticated) redirect('/profile');
    return <SignUpForm />;
}
