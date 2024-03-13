export type TItemConfigurationRawData = {
    id: number;
    itemType: string;
    level: number;
    minimumBonus: number;
    maximumBonus: number;
    upgradeCost: number;
    costToken: string;
    createdAt: string;
    updatedAt: string;
    itemImageUrls: { url?: string; thumbnailUrl: string }[];
};

export type TItemConfigurationData = {
    id?: number | string;
    itemType: string;
    level: number;
    minimumBonus: number;
    maximumBonus: number;
    upgradeCost: number;
    costToken: string;
    itemImageUrls: { url?: string; thumbnailUrl: string }[];
};

export type TDeleteItemConfiguration = {
    itemType: string;
    level: number;
};

export type TRemoveItemImage = {
    index: number;
    url: string;
};
export const ITEMCONFIGURATION_ATTRIBUTE_KEYS = [
    "id",
    "itemType",
    "level",
    "minimumBonus",
    "maximumBonus",
    "upgradeCost",
    "costToken",
    "itemImageUrls",
];
export const isItemConfigurationAttributeKey = (
    value: string
): value is keyof TItemConfigurationData => {
    return ITEMCONFIGURATION_ATTRIBUTE_KEYS.includes(value);
};
export const mapItemConfigurationData = (
    raw: TItemConfigurationRawData
): TItemConfigurationData => {
    return {
        id: raw.id,
        itemType: raw.itemType,
        level: raw.level,
        minimumBonus: raw.minimumBonus,
        maximumBonus: raw.maximumBonus,
        upgradeCost: raw.upgradeCost,
        costToken: raw.costToken,
        itemImageUrls: raw.itemImageUrls,
    };
};
