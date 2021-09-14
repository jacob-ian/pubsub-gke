import React from "react";
import styles from "./NewUserForm.module.sass";

interface NewUserFormProps {
  value: { email: string; fname: string; lname: string };
  onChange: React.FormEventHandler<HTMLInputElement>;
}

export default function NewUserForm(props: NewUserFormProps) {
  return (
    <form className={styles.form}>
      <div className={styles.group}>
        <div className={styles["form-field"]}>
          <label htmlFor="fname">First Name:</label>
          <input
            id="fname"
            value={props.value.fname}
            name="fname"
            onChange={props.onChange}
          />
        </div>
        <div className={styles["form-field"]}>
          <label htmlFor="lname">Last Name:</label>
          <input
            id="lname"
            value={props.value.lname}
            name="lname"
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className={styles["form-field"]}>
        <label htmlFor="email">Email Address:</label>
        <input
          id="email"
          name="email"
          value={props.value.email}
          onChange={props.onChange}
        />
      </div>
    </form>
  );
}
