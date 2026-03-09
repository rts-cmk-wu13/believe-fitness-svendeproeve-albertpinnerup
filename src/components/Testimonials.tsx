import { log } from 'console';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './ui/carousel';
import { fetchUtil } from '@/lib/utils';
import carouselImage from '../../public/splash2.png';
import { ClassNameValue } from 'tailwind-merge';

type TestimonialType = {
    id: number;
    text: string;
    name: string;
};

export default async function Testimonials() {
    const testimonials = await fetchUtil('testimonials');

    if (testimonials.length === 0) {
        return;
    }
    log('testimonials', testimonials);

    return (
        <Carousel
            className='text-background bg-[url(../../public/splash2.png)] bg-cover'
            opts={{ loop: true }}
        >
            <div className='w-full h-full py-8 px-5 bg-black/40 flex flex-col justify-between'>
                <h3 className='font-bold text-center'>A word from other Believers</h3>
                <CarouselContent>
                    {testimonials.map((testimonial: TestimonialType) => (
                        <CarouselItem
                            key={testimonial.id}
                            className='flex flex-col items-center gap-4 p-4'
                        >
                            <p className='text-center'>"{testimonial.text}"</p>
                            <section>
                                <h4 className='text-center font-bold'>{testimonial.name} </h4>
                            </section>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className='flex items-center justify-center gap-2'>
                    <CarouselPrevious size={'icon-xl'} className='bg-transparent' />
                    <CarouselNext size={'icon-xl'} className='bg-transparent' />
                </div>
            </div>
        </Carousel>
    );
}
