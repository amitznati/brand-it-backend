import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        Business(id: ID!): Business!
        allBusinesses(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: BusinessFilter): [Business]
        _allBusinessesMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: BusinessFilter): ListMetadata
    }
    extend type Mutation {
        createBusiness(name: String!): Business!
        updateBusiness(id: ID!, name: String!): Business!
        deleteBusiness(id: ID!): Business
    }
    type Business {
        id: ID!
        name: String!
        categories: [Category]
    }
    input CreateBusinessInput {
        name: String!
    }
    input BusinessFilter {
        q: String
        id: ID
        ids: [ID]
        title: String
        views: Int
        views_lt: Int
        views_lte: Int
        views_gt: Int
        views_gte: Int
    }
`;
