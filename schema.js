
const fetch = require('node-fetch')
const { GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require('graphql')


//Launch Type
const LaunchType= new GraphQLObjectType({
    // Each TYPE has a NAME && FIELD key/value
    name: 'Launch',
    fields: () => ({
       
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        rocket: { type: RocketType }
    })
}) 

/* Create relationships in schema... */
    // Rocket Type
    const RocketType = new GraphQLObjectType({
        // Each TYPE has a NAME && FIELD key/value
        name: 'Rocket',
        fields: () => ({
            // Each FIELD will also have TYPE (String, Int, etc...)
            rocket_id: { type: GraphQLString },
            rocket_name: { type: GraphQLString },
            rocket_type: { type: GraphQLString }
        })
    }) 

    /*
    ROOT QUERY 
    create endpoints like resolvers to resolve our data
    */

    //Root Query
    const RootQuery = new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            launches: {
              // LIST needs a TYPE...
              type: new GraphQLList(LaunchType),
              resolve(parent, args) {
                //This is WHERE we (request) get the DATA
                return fetch('https://api.spacexdata.com/v3/launches/')
                .then(res => res.json())
              }
            }
        }
    })

    module.exports = new GraphQLSchema({
      query: RootQuery
    })

