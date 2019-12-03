import React from "react";
import { Link } from "react-router-dom";

export default function Title(props) {
  return (
    <h1>
      <Link to="/">{props.copy}</Link>
    </h1>
  );
}
