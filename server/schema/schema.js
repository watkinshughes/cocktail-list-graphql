const graphql = require("graphql");
const Cocktail = require("../models/cocktail");
const sanitize = require("mongo-sanitize");

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
        const cleanId = sanitize(args.id);
        return Cocktail.findById(cleanId);
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
    submitCocktail: {
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
        const cleanName = sanitize(args.name);
        const cleanCategory = sanitize(args.category);
        const cleanGlass = sanitize(args.glass);
        const cleanGarnish = sanitize(args.garnish);
        const cleanPreparation = sanitize(args.preparation);
        const cleanIngedients = sanitize(args.ingredients);
        const cleanContact = sanitize(args.contact);
        const cleanPublished = sanitize(args.published);

        const cocktail = new Cocktail({
          name: cleanName,
          category: cleanCategory,
          glass: cleanGlass,
          garnish: cleanGarnish,
          preparation: cleanPreparation,
          ingredients: cleanIngedients,
          contact: cleanContact,
          published: cleanPublished
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
