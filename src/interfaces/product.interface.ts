export interface Products {
    items: Item[];

}

export interface Item {
    id: string;
    name: string;
    slug: string;
    description: string;
    assets: Asset[];
    variants: Variant[];
    variantList: VariantList;
    featuredAsset: FeaturedAsset;
}

export interface Asset {
    id: string;
    name: string;
    source: string;

}

export interface ItemCard {
    buyItem(item: Item): void;
    item: Item;
}

export interface Variant {
    id: string;
    name: string;
}
export interface VariantList {
    items: ItemPrice[];
}

export interface ItemPrice {
    price: number;
}

export interface FeaturedAsset {
    source: string;
}













