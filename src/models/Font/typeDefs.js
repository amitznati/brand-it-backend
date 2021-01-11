import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        Font(id: ID!): Font!
        allFonts(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: FontFilter): [Font]
        _allFontsMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: FontFilter): ListMetadata
    }
    extend type Mutation {
        createFont(name: String!, fontFile: Upload!): Font!
        updateFont(id: ID!, name: String!, fontFile: Upload!): Font!
        deleteFont(id: ID!): Font!
    }
    type Font {
        id: ID!
        name: String!
        url: String!
    }
    input FontFilter {
        q: String
        id: ID
        ids: [ID]
    }
`;
