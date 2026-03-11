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

export type TrainerType = {
    assetId: number;
    id: number;
    trainerNamer: string;
};

export type UserType = Omit<UserFormData, 'rememberMe' | 'password'> & {
    roster: {
        classId: number;
        userId: number;
    };
    id: number;
};
