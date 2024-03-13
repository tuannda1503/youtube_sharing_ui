export type TRarityChanceRawData = {
    id: number;
    firstRarity: string;
    secondRarity: string;
    commonRate: number;
    rareRate: number;
    epicRate: number;
    heroicRate: number;
    legendaryRate: number;
};

export type TRarityChanceData = {
    firstRarity: string;
    secondRarity: string;
    commonRate: number;
    rareRate: number;
    epicRate: number;
    heroicRate: number;
    legendaryRate: number;
};
export const RARITY_CHANCE_KEY = [
    "firstRarity",
    "secondRarity",
    "commonRate",
    "rareRate",
    "epicRate",
    "heroicRate",
    "legendaryRate",
];

export const iRarityChanceKey = (key: string): key is keyof TRarityChanceData => {
    return RARITY_CHANCE_KEY.includes(key);
};
export const mapRarityChanceData = (raw: TRarityChanceRawData): TRarityChanceData => {
    return {
        firstRarity: raw.firstRarity,
        secondRarity: raw.secondRarity,
        commonRate: raw.commonRate,
        rareRate: raw.rareRate,
        epicRate: raw.epicRate,
        heroicRate: raw.heroicRate,
        legendaryRate: raw.legendaryRate,
    };
};
