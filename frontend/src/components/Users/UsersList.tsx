import React, { ReactNode, useEffect, useState } from "react";
import styles from "./UsersList.module.sass";
import { UserDocument, UsersService } from "../../services/Users.service";
import User from "./User";
import NewUserForm from "./NewUserForm";
import MatIcon from "../MatIcon/MatIcon";

export default function UsersList() {
  const [users, setUsers] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [newUser, setNewUser] = useState({
    fname: "",
    lname: "",
    email: "",
  });

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

  function handleNewUserForm(e: React.FormEvent<HTMLInputElement>): void {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    setNewUser({ ...newUser, [name]: value });
  }

  async function handleCreate(): Promise<void> {
    try {
      const formData = {
        email: newUser.email,
        name: { first: newUser.fname, last: newUser.lname },
      };
      const res = await UsersService.create(formData);
      const created = res.data.data.created;
      setUsers((current) => current.concat(created));
      setNewUser({
        email: "",
        fname: "",
        lname: "",
      });
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
      <h2>Create New User</h2>
      <NewUserForm value={newUser} onChange={handleNewUserForm} />
      <button className={styles["create-button"]} onClick={handleCreate}>
        <MatIcon icon="add" />
        Create
      </button>
    </>
  );
}
