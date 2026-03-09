import { NewsType } from '@/lib/types';
import Image from 'next/image';

type NewsArticleProps = {
    title: string;
    text: string;
    url: string;
};

export default async function NewsArticle({ title, text, url }: NewsArticleProps) {
    return (
        <section className='flex flex-col gap-2'>
            <h3>{title}</h3>
            <Image src={url} width={370} height={200} alt={title} className='w-full' />
            <p>{text}</p>
        </section>
    );
}
