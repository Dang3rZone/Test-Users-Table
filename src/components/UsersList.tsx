import { SortBy, type User } from '../types.d';

interface Props {
  changeSorting: (sort: SortBy) => void;
  showColors: boolean;
  deleteUser: (cell: string) => void;
  users: User[];
}
export function UsersList({
  changeSorting,
  deleteUser,
  showColors,
  users
}: Props) {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Picture</th>
          <th
            className="pointer"
            onClick={() => {
              changeSorting(SortBy.NAME);
            }}
          >
            Name
          </th>
          <th
            className="pointer"
            onClick={() => {
              changeSorting(SortBy.LAST);
            }}
          >
            Last Name
          </th>
          <th
            className="pointer"
            onClick={() => {
              changeSorting(SortBy.COUNTRY);
            }}
          >
            Country
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className={showColors ? 'table--showColors' : 'table'}>
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
                <button
                  onClick={() => {
                    deleteUser(user.cell);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
