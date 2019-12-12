import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function SubmissionConfirmation() {
  return (
    <section className={styles.thankyou}>
      <h1>Thank you for submitting your cocktail recipe!</h1>
      <p>We will be in touch via email if we decide to add it to the list.</p>
      <Link to="/">← Back</Link>
    </section>
  );
}
