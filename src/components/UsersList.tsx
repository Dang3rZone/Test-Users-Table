import { type User } from '../types.d';

interface Props {
  users: User[];
}
export function UsersList({ users }: Props) {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Last Name</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.cell}>
              <td>
                <img src={user.picture.thumbnail} alt={user.name.first} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
