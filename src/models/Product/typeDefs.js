import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        Product(id: ID!): Product!
        allProducts(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ProductFilter): [Product]
        _allProductsMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ProductFilter): ListMetadata
        getProductWithTemplates(productId: ID!): ProductWithTemplates!
        getProductsWithTemplates(params: ProductsWithTemplatesInput): [ProductWithTemplates]!
    }
    extend type Mutation {
        createProduct(name: String!
            image: Upload
            categories: [ID]
            size: SizeInput!
            templateFrame: TemplateFrameInput!
            dynamicTextOptions: [String]): Product!
        updateProduct(id: ID!, name: String!
            image: Upload
            categories: [ID]
            size: SizeInput!
            templateFrame: TemplateFrameInput!
            dynamicTextOptions: [String]): Product!
        deleteProduct(id: ID!): Product!
        addTemplate(id: ID!, template: String!, templateId: ID): Product!
        deleteTemplate(id: ID!, productId: ID): String!
    }
    type Template {
        id: ID!
        template: String!
    }
    type ProductSize {
        height: Float!
        width: Float!
    }
    type TemplateFrame {
        height: Float!
        width: Float!
        x: Float!
        y: Float!
    }
    type CategoryForProduct {
        id: ID!
        name: String
    }
    type Product {
        id: ID!
        name: String!
        imageUrl: String
        size: ProductSize!
        templateFrame: TemplateFrame!
        categories: [ID]
        templates: [ID]
        dynamicTextOptions: [String]
    }
    type ProductWithTemplates {
        id: ID!
        name: String!
        imageUrl: String
        size: ProductSize!
        templateFrame: TemplateFrame!
        categories: [ID]
        templates: [Template]
        dynamicTextOptions: [String]
    }
    type BusinessForProduct {
        id: ID!
        name: String!
    }
    input CategoryForUpdateProduct {
        id: ID!
        name: String
    }
    input SizeInput {
        height: Float!
        width: Float!
    }
    input TemplateFrameInput {
        height: Float!
        width: Float!
        x: Float!
        y: Float!
    }
    input CreateProductInput {
        name: String!
        image: Upload!
        categories: [ID]
        size: SizeInput!
        templateFrame: TemplateFrameInput!
        dynamicTextOptions: [String]
    }
    input ProductFilter {
        q: String
        id: ID
        categories: [ID]
        category: ID
    }
    input ProductsWithTemplatesInput {
        categories: [ID]
        ids: [ID]
    }
`;
