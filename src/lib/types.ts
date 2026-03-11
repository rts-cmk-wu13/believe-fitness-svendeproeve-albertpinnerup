//news type

import { UserFormData } from './schema';

export type NewsType = {
    text: string;
    assetId: number;
    title: string;
    asset: AssetType;
    id: number;
};

export type AssetType = {
    id: number;
    url: string;
};

export type ClassesType = {
    assetId: number;
    asset: AssetType;
    classDay: string;
    classDescription: string;
    className: string;
    classTime: string;
    id: number;
    maxParticipants: number;
    trainer: TrainerType;
    trainerId: number;
    users: UserType[];
};

export type ClassWithRatings = {
    classItem: ClassesType;
    ratings: RatingType[];
};

export type UserType = Omit<UserFormData, 'rememberMe' | 'password'> & {
    roster: {
        classId: number;
        userId: number;
    };
    id: number;
};

export type RatingType = {
    id: number;
    rating: number;
    userId: number;
    classId: number;
};

export type TrainerType = {
    id: number;
    trainerName: string;
    assetId: number;
    classItem: Omit<ClassesType, 'users' | 'asset' | 'trainer'>;
    asset: AssetType;
};
