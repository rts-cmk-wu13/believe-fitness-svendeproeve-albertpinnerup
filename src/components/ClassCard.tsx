import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type ClassesCardProps = {
    title: string;
    imgUrl: string;
    rating?: number;
    id?: number;
    heroCard?: boolean;
};

const maxRating = 5;

export default function ClassesCard({ imgUrl, id, title, rating, heroCard }: ClassesCardProps) {
    return (
        <div
            className={`rounded-2xl relative ${!heroCard && 'rounded-br-none'} overflow-hidden w-full`}
        >
            <Link href={`classes/${id}`} className='flex flex-col gap-4 aspect-128/145'>
                <Image
                    src={imgUrl}
                    alt={`${title} Image`}
                    fill
                    objectFit='cover'
                    className='w-full overflow-hidden'
                />
            </Link>
            <div
                className={`${heroCard ? 'pr-12 pl-4' : 'w-full px-4'} z-10 absolute bottom-0 flex flex-col gap-1  bg-secondary mt-auto  py-2 rounded-tr-[30px] rounded-bl-2xl`}
            >
                {heroCard ? (
                    <p className='font-semibold line-clamp-1'>{title}</p>
                ) : (
                    <p className='text-sm font-semibold line-clamp-1'>{title}</p>
                )}

                <div className='flex gap-1'>
                    {Array.from({ length: maxRating }).map((_, i) => {
                        const filled = rating && i < rating;

                        return (
                            <Star
                                key={i}
                                className={filled ? 'fill-black text-black' : 'text-black'}
                                size={11}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
