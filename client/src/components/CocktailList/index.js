import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import Cocktail from "../Cocktail";
import styles from "./styles.module.css";

const GET_COCKTAILS = gql`
  {
    cocktails {
      id
      name
    }
  }
`;

export default function CocktailList() {
  const { loading, error, data } = useQuery(GET_COCKTAILS);
  
  const filterList = () => {
    return true;
  }

  if (loading) {
    return (
      <div className="loading">
        <span className="visuallyHidden">Loading</span>
    </div>)
  }
  if (error) {
    return <p>Error</p>
  }
  
  return (
    <section className={styles.cocktailList}>
      <form>
        <fieldset>
          <label>
            <span className="visuallyHidden">
              Filter by name or search by ingredient
            </span>
            <input
              type="text"
              className="Search"
              placeholder="Search by ingredient"
              onChange={filterList}
            />
          </label>
        </fieldset>
      </form>
      { data.cocktails.map(cocktail => {
        return (
         <Cocktail key={cocktail.id} id={cocktail.id} name={cocktail.name} />
        );
        })}
        </section>
    )
}
