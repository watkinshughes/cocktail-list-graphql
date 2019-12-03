import React from "react";
import { Link } from "react-router-dom";
import Title from "../Title";

export default function Header() {
  return (
    <header>
      <Title copy="Cocktail List" />
      <Link to="/add-cocktail">Add cocktail</Link>
    </header>
  );
}
