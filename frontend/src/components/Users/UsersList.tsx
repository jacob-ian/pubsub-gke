import styles from "./UsersList.module.sass";
import { HTTPMethods, useApi } from "../../hooks/useApi";
import User from "./User";

export interface UserDocument {
  _id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
}

export default function UsersList() {
  const { data, error, loading } = useApi({
    method: HTTPMethods.GET,
    url: "/users",
  });

  function handleDelete(id: string) {
    console.log(`delete ${id}`);
  }

  let content = <div>Something went wrong!</div>;

  if (!loading) {
    if (error) {
      content = <div>{JSON.stringify(error, null, 2)}</div>;
    } else if (data) {
      content =
        data.users?.length > 0 ? (
          data.users.map((user: any) => (
            <User
              key={user._id}
              firstName={user.name.first}
              lastName={user.name.last}
              email={user.email}
              handleDelete={() => handleDelete(user._id)}
            />
          ))
        ) : (
          <div>There are no users!</div>
        );
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
