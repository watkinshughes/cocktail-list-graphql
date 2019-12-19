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
    imageUrl: { type: GraphQLString },
    published: { type: GraphQLBoolean }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    cocktail: {
      type: CocktailType,
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        const cleanName = sanitize(args.name);
        return Cocktail.findOne({ name: cleanName });
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
        imageUrl: { type: GraphQLString },
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
        const cleanImageUrl = sanitize(args.imageUrl);
        const cleanPublished = sanitize(args.published);

        const cocktail = new Cocktail({
          name: cleanName,
          category: cleanCategory,
          glass: cleanGlass,
          garnish: cleanGarnish,
          preparation: cleanPreparation,
          ingredients: cleanIngedients,
          contact: cleanContact,
          imageUrl: cleanImageUrl,
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
