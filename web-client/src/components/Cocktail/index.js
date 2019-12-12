import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function Cocktail(props) {
  return (
    <article className={styles.cocktail}>
      <Link to={props.id}>
        <h1>
          <span>{props.name}</span> <small>view recipe →</small>
        </h1>
      </Link>
    </article>
  );
}
