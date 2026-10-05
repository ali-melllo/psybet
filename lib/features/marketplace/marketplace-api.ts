import { api } from "@/lib/features/api/api-slice";
import type { MarketplaceStat, NftPack, RoadmapMilestone } from "@/types/marketplace";

export const marketplaceApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPacks: build.query<NftPack[], void>({ query: () => "/packs", providesTags: ["Packs"] }),
    getStats: build.query<MarketplaceStat[], void>({ query: () => "/stats", providesTags: ["Stats"] }),
    getRoadmap: build.query<RoadmapMilestone[], void>({ query: () => "/roadmap", providesTags: ["Roadmap"] }),
  }),
});

export const { useGetPacksQuery, useGetStatsQuery, useGetRoadmapQuery } = marketplaceApi;
