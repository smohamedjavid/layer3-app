export interface Metadata {
  image: string;
  external_url: string;
  is_normalized: boolean;
  image_url: string;
  name: string;
  description: string;
  attributes: Attribute[];
  version: number;
  url: string;
  _extension: Extension;
}

export interface Attribute {
  value: string | number | boolean | null;
  trait_type: string;
  display_type?: string;
}

export interface Extension {
  currentOwnerLastUpdated: string;
  currentOwner: string;
}

export interface OpenSeaMetadata {
  floorPrice: number;
  collectionName: string;
  collectionSlug: string;
  safelistRequestStatus: string;
  imageUrl: string;
  description: string;
  externalUrl: string;
  twitterUsername: string;
  discordUrl: string;
  bannerImageUrl: string;
  lastIngestedAt: string;
}

export interface AlchemyNFTItem {
  contract: {
    address: string;
    name: string;
    symbol: string;
    totalSupply: number;
    tokenType: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    openSeaMetadata: OpenSeaMetadata;
    isSpam: boolean;
    spamClassifications: string[];
  };
  tokenId: string;
  tokenType: string;
  name: string;
  title: string;
  description: string;
  tokenUri: string;
  image: {
    cachedUrl: string;
    thumbnailUrl: string;
    pngUrl: string;
    contentType: string;
    size: number;
    originalUrl: string;
  };
  animation: {
    cachedUrl: string;
    contentType: string;
    size: string;
    originalUrl: string;
  };
  raw: {
    tokenUri: string;
    metadata: Metadata;
    error: string;
  };
  collection: {
    name: string;
    slug: string;
    externalUrl: string;
    bannerImageUrl: string;
  };
  mint: {
    mintAddress: string;
    blockNumber: number;
    timestamp: string;
    transactionHash: string;
  };
  owners: any;
  timeLastUpdated: string;
  balance: string;
  acquiredAt: {
    blockTimestamp: string;
    blockNumber: number;
  };
}

export interface AlchemyNFTResponse {
  ownedNfts: Array<AlchemyNFTItem>;
  pageKey?: string;
  totalCount: number;
  validAt: {
    blockNumber: number;
    blockHash: string;
    blockTimestamp: string;
  };
}
