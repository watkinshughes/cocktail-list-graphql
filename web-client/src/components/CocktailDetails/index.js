import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styles from "./styles.module.css";

const GET_COCKTAIL_DETAILS = gql`
  query($slug: String) {
    cocktail(slug: $slug) {
      id
      name
      glass
      category
      garnish
      preparation
      ingredients
      imageUrl
    }
  }
`;

export default function CocktailDetails() {
  const searchParams = window.location.search;
  const { slug } = useParams();
  const { loading, error, data } = useQuery(GET_COCKTAIL_DETAILS, {
    variables: { slug }
  });

  if (loading) {
    return (
      <div className="loading">
        <span className="visuallyHidden">Loading</span>
      </div>
    );
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <article className={styles.cocktailDetails}>
      <div className={styles.recipeInfo}>
        <h1>{data.cocktail.name}</h1>
        <h2>
          <em>{data.cocktail.category}</em>
        </h2>
        <div className="displayLinebreak">{data.cocktail.ingredients}</div>
        <p>{data.cocktail.preparation}</p>
        <p>
          <strong>Standard garnish:</strong> {data.cocktail.garnish}
        </p>
        <p>
          <strong>Glassware:</strong> {data.cocktail.glass}
        </p>
        <Link to={`/${searchParams}`}>
          <div>
            <img alt="" src="/arrow-left.png" height="15" width="15" /> Back
          </div>
        </Link>
      </div>
      {data.cocktail.imageUrl ? (
        <div className={styles.image}>
          <img src={data.cocktail.imageUrl} alt={data.cocktail.name} />
        </div>
      ) : (
        <div />
      )}
    </article>
  );
}
