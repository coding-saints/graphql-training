const GraphQLObjectType = require('graphql')

//Launch Type
const LaunchType= new GraphQLObjectType({
    // Each TYPE has a NAME && FIELD key/value
    name: 'Launch',
    fields: () => ({
        // Each FIELD will also have TYPE (String, Int, etc...)
  
    })
}) 