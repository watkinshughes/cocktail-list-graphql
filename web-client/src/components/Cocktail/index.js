import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function Cocktail(props) {
  return (
    <article className={styles.cocktail}>
      <Link to={`${props.slug}${props.searchParams}`}>
        <h1>
          <span>{props.name} </span>
          <img
            src="/arrow-right.png"
            width="15"
            height="15"
            alt="view recipe"
          />
        </h1>
      </Link>
    </article>
  );
}
