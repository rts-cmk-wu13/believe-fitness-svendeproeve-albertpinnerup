//news type

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
