import styles from "./App.module.sass";
import Header from "./components/Header/Header";
import UsersList from "./components/Users/UsersList";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <main className={styles.content}>
        <UsersList />
      </main>
    </div>
  );
}

export default App;
