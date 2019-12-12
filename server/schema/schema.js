const graphql = require("graphql");
const Cocktail = require("../models/cocktail");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} = graphql;

const CocktailType = new GraphQLObjectType({
  name: "Cocktail",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    glass: { type: GraphQLString },
    garnish: { type: GraphQLString },
    preparation: { type: GraphQLString },
    ingredients: { type: GraphQLString },
    contact: { type: GraphQLString },
    published: { type: GraphQLBoolean }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    cocktail: {
      type: CocktailType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Cocktail.findById(args.id);
      }
    },
    cocktails: {
      type: new GraphQLList(CocktailType),
      resolve(parent, args) {
        return Cocktail.find({ published: true });
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCocktail: {
      type: CocktailType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        glass: { type: new GraphQLNonNull(GraphQLString) },
        garnish: { type: GraphQLString },
        preparation: { type: new GraphQLNonNull(GraphQLString) },
        ingredients: { type: new GraphQLNonNull(GraphQLString) },
        contact: { type: new GraphQLNonNull(GraphQLString) },
        published: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve(parent, args) {
        let cocktail = new Cocktail({
          name: args.name,
          category: args.category,
          glass: args.glass,
          garnish: args.garnish,
          preparation: args.preparation,
          ingredients: args.ingredients,
          contact: args.contact,
          published: args.published
        });
        return cocktail.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
