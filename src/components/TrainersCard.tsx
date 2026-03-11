import { TrainerType } from '@/lib/types';
import Image from 'next/image';

export default function TrainersCard({ trainer }: { trainer: TrainerType }) {
    return (
        <section className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <Image
                    src={trainer.asset.url}
                    alt={trainer.trainerName}
                    width={88}
                    height={88}
                    className='rounded-xl overflow-hidden aspect-square object-cover object-top'
                />
                <p className='font-semibold'>{trainer.trainerName}</p>
            </div>
        </section>
    );
}
