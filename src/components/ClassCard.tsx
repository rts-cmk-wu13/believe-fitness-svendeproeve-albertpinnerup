import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type ClassesCardProps = {
    title: string;
    imgUrl: string;
    rating?: number;
    id?: number;
};

const maxRating = 5;

export default function ClassesCard({ imgUrl, id, title, rating, ...props }: ClassesCardProps) {
    return (
        <div className='rounded-2xl relative rounded-br-none overflow-hidden w-[128px]'>
            <Link href={`classes/${id}`} className='flex flex-col gap-4 aspect-128/145' {...props}>
                <Image
                    src={imgUrl}
                    alt={`${title} Image`}
                    fill
                    objectFit='cover'
                    className='w-full overflow-hidden'
                />
            </Link>
            <div className='z-10 absolute bottom-0 w-full bg-secondary mt-auto px-4 py-2 rounded-tr-[30px] rounded-bl-2xl'>
                <p className='text-sm font-semibold line-clamp-1'>{title}</p>
                <div className='flex'>
                    {Array.from({ length: maxRating }).map((_, i) => {
                        const filled = rating && i < rating;

                        return <Star key={i} fill={filled ? 'text-black' : ''} />;
                    })}
                </div>
            </div>
        </div>
    );
}
