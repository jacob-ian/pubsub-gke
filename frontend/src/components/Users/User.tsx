import MatIcon from "../MatIcon/MatIcon";
import styles from "./User.module.sass";

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
}

export default function User(props: UserProps) {
  return (
    <div className={styles.user}>
      <div className={styles.details}>
        <div className={styles.name}>
          {props.firstName} {props.lastName}
        </div>
        <div className={styles.email}>{props.email}</div>
      </div>
      <button className={styles["delete-button"]} onClick={props.handleDelete}>
        <MatIcon icon="delete" />
      </button>
    </div>
  );
}
