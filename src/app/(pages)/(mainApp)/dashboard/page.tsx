import ContactForm from '@/components/ContactForm';
import DashboardHero from '@/components/DashboardHero';
import NewsArticle from '@/components/NewsArticle';
import NewsletterSignUp from '@/components/NewsletterSignupForm';
import Testimonials from '@/components/Testimonials';
import { NewsType } from '@/lib/types';
import { fetchUtil } from '@/lib/utils';

export default async function dashboard() {
    const articles = await fetchUtil('news');

    return (
        <section>
            <DashboardHero />
            <section className='p-5 flex flex-col gap-4'>
                <h1 className='text-secondary'>News</h1>
                <div className='flex flex-col gap-12'>
                    {articles.map((article: NewsType) => (
                        <NewsArticle
                            key={article.id}
                            text={article.text}
                            url={article.asset.url}
                            title={article.title}
                        />
                    ))}
                </div>

                <hr className='w-[40px] h-0.5 bg-black mx-auto my-4' />
                <NewsletterSignUp />
            </section>
            <Testimonials />
            <section className='p-5'>
                <ContactForm />
            </section>
            <hr className='w-[40px] h-0.5 bg-black mx-auto my-4' />
        </section>
    );
}
