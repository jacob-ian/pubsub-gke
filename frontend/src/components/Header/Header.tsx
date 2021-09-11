import styles from "./Header.module.sass";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Pubsub GKE Test Project</h1>
      <div className={styles.subtitle}>A project by Jacob Ian Matthews</div>
    </header>
  );
}
