import React from "react";
import styles from "./NewUserForm.module.sass";

interface NewUserFormProps {
  values: { email: string; name: { first: string; last: string } };
  handleChange: React.FormEventHandler<HTMLInputElement>;
}

export default function NewUserForm(props: NewUserFormProps) {
  return (
    <form className={styles.form}>
      <label>
        <strong>Name</strong>
      </label>
      <label htmlFor="fname">First:</label>
      <input
        id="fname"
        value={props.values.name.first}
        name="name.first"
        onChange={props.handleChange}
      />
      <label htmlFor="lname">Last:</label>
      <input
        id="lname"
        value={props.values.name.last}
        name="name.last"
        onChange={props.handleChange}
      />
      <label htmlFor="email">Email Address:</label>
      <input
        id="email"
        name="email"
        value={props.values.email}
        onChange={props.handleChange}
      />
    </form>
  );
}
