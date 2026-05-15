const {buildSchema} = require('graphql');

module.exports = buildSchema(`
    type Game {
        _id: ID!
        title: String!
        description: String!        
        genre: [String]!
        players: String!
        difficulty: String!        
        picture: String   
        length: String!
        status: String!
    }    
    
    type PageInfo {
        currentPage: Int!
        totalPages: Int!
        totalGames: Int!
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
    }
    
    type PaginatedGames {
        games: [Game!]!
        pageInfo: PageInfo!
    }

    input GameFilter {
        title: String
        genre: String
        difficulty: String
        players: String
    }

    type Rental {
        _id: ID!
        user: User!
        game: Game!
        rentalDate: String!
    }

    type Return {
        _id: ID!
        user: User!
        game: Game!
        returnDate: String!
    }

    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String
        rentedGames: [Game!]
    }    

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input GameInput {
        title: String!
        description: String!
        picture: String
        difficulty: String!
        players: String!
        length: String!
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    type RootQuery {
        games(
            page: Int, 
            limit: Int,
            filter: GameFilter
        ): PaginatedGames!
        users: [User!]!
        login(email: String!, password: String!): AuthData!
        rental: [Rental!]!
        profile: User
    }

    type RootMutation {
        createGame(gameInput: GameInput): Game
        createUser(userInput: UserInput): User
        rentGame(gameId: ID!): Rental!
        returnGame(gameId: ID!): Return!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);