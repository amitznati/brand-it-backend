import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        UploadedImage(id: ID!): UploadedImage!
        allUploadedImages(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: UploadedImageFilter): [UploadedImage]
        _allUploadedImagesMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: UploadedImageFilter): ListMetadata
    }
    extend type Mutation {
        createUploadedImage(name: String!, UploadedImageFile: Upload!): UploadedImage!
        updateUploadedImage(id: ID!, name: String!, UploadedImageFile: Upload!): UploadedImage!
        deleteUploadedImage(id: ID!): UploadedImage!
    }
    type UploadedImage {
        id: ID!
        name: String!
        url: String!
    }
    input UploadedImageFilter {
        q: String
        id: ID
        ids: [ID]
    }
`;
