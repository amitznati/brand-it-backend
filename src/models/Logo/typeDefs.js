import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        Logo(id: ID!): Logo!
        allLogos(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: LogoFilter): [Logo]
        _allLogosMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: LogoFilter): ListMetadata
    }
    extend type Mutation {
        createLogo(name: String!, template: String!): Logo!
        updateLogo(id: ID!, name: String!, template: String!): Logo!
    }
    type Logo {
        id: ID!
        name: String!
        template: String
    }
    input LogoFilter {
        q: String
        id: ID
        ids: [ID]
    }
`;
