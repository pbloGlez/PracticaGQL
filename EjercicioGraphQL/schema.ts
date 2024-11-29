
export const schema = `#graphql
type Flight {
    id : ID!
    origen : String!
    destino : String!
    }
    
type Query {
    flights : [Flight!]!
    flight(id: ID!): Flight
}    

type Mutation {
    addFlight(origen : String!, destino : String!, fechaHora : String!) : Flight!
}
`;