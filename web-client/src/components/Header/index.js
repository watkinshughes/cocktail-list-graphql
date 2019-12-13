import React from "react";
import { Link } from "react-router-dom";
import Title from "../Title";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Title copy="A Proper List" />
      <Link className={styles.menu} to="/submit-cocktail">
        Submit cocktail
      </Link>
    </header>
  );
}
