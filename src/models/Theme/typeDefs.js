import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        Theme(id: ID!): Theme!
        allThemes(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ThemeFilter): [Theme]
        _allThemesMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ThemeFilter): ListMetadata
    }
    extend type Mutation {
        createTheme(name: String!, palette: PaletteInput!, fontFamilies: FontFamiliesInput!, imagesInput: imagesInput): Theme!
        updateTheme(id: ID!, name: String!, palette: PaletteInput!, fontFamilies: FontFamiliesInput!, imagesInput: imagesInput): Theme!
        deleteTheme(id: ID!): Theme!
    }
	type Palette {
        primary: String!
        secondary: String!
        tertiary: String!
	}
	type FontFamilies {
        primary: FontData!
        secondary: FontData
        tertiary: FontData
    }
    type FontData {
        fontFamily: String!
        fontProvider: String
        fontUrl: String
    }
    type Theme {
        id: ID!
        name: String!
        palette: Palette!
        fontFamilies: FontFamilies!
        images: imagesForProduct!
    }
    type imagesForProduct {
        bg: String
        frame: String
        sideL: String
        sideR: String
        sideB: String
        sideT: String
    }
    input PaletteInput {
        primary: String!
        secondary: String!
        tertiary: String!
    }
    input FontFamiliesInput {
        primary: FontDataInput!
        secondary: FontDataInput
        tertiary: FontDataInput
    }
    input FontDataInput {
        fontFamily: String!
        fontProvider: String
        fontUrl: String
    }
    input imagesInput {
        bg: Upload
        frame: Upload
        sideL: Upload
        sideR: Upload
        sideB: Upload
        sideT: Upload
    }
    input ThemeFilter {
        q: String
        id: ID
        ids: [ID]
    }
`;
