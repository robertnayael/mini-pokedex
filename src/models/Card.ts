export interface Card {
    id: string;
    imageUrl: string;
    imageUrlHiRes: string;
    name: string;
    supertype: string;
    series: string;
    types: string[];
    rarity: string;
    nationalPokedexNumber: number;
    hp: string;
    set: string;
    evolvesFrom: string;
    weaknesses: {
        type: string;
        value: string
    }[];
    attacks: {
        cost: string[];
        name: string;
        text: string;
        damage: string;
        convertedEnergyCost: number;
    }[];
}
