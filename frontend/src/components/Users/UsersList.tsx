import { ReactNode, useEffect, useState } from "react";
import styles from "./UsersList.module.sass";
import { UserDocument, UsersService } from "../../services/Users.service";
import User from "./User";

export default function UsersList() {
  const [users, setUsers] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    setLoading(true);
    UsersService.getAll()
      .then(({ data }) => {
        setUsers(data.data.users);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: string) {
    try {
      await UsersService.delete(id);
      setUsers((state) => state.filter((user) => user._id !== id));
    } catch (err) {
      setError(err);
    }
  }

  let userEls = users.map((user) => (
    <User
      key={user._id}
      firstName={user.name.first}
      lastName={user.name.last}
      email={user.email}
      handleDelete={() => handleDelete(user._id)}
    />
  ));

  let content: ReactNode;
  if (!loading) {
    if (error) {
      content = <div>{JSON.stringify(error, null, 2)}</div>;
    } else if (users) {
      content = users.length > 0 ? userEls : <div>There are no users!</div>;
    }
  }

  return (
    <>
      <h2>Users</h2>
      <div className={styles["users-list"]}>
        {loading ? <div>loading...</div> : content}
      </div>
    </>
  );
}
