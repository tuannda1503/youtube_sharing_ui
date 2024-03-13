export type TMintingPolicyRawData = {
    id: number;
    baseMintingCost: number;
    feePerMint: number;
    maximumMintingTimePerCharacter: number;
    baseToken: string;
    feeToken: string;
    createdAt: Date;
    updatedAt: Date;
};

export type TMintingPolicyData = {
    baseMintingCost: number;
    feePerMint: number;
    maximumMintingTimePerCharacter: number;
    baseToken: string;
    feeToken: string;
};
export const MINTING_POLICY_KEY = [
    "baseMintingCost",
    "feePerMint",
    "maximumMintingTimePerCharacter",
    "baseToken",
    "feeToken",
];

export const isMintingPolicyKey = (value: string): value is keyof TMintingPolicyData => {
    return MINTING_POLICY_KEY.includes(value);
};
export const mapMintingPolicyData = (raw: TMintingPolicyRawData): TMintingPolicyData => {
    return {
        baseMintingCost: raw.baseMintingCost,
        feePerMint: raw.feePerMint,
        maximumMintingTimePerCharacter: raw.maximumMintingTimePerCharacter,
        baseToken: raw.baseToken,
        feeToken: raw.feeToken,
    };
};
