import { useEffect, useRef, useState } from 'react';
import './App.css';
import { type User } from './types';
import { UsersList } from './components/UsersList';

function App() {
  const apiUsers = 'https://randomuser.me/api/?results=100';

  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const originalUsers = useRef<User[]>([]);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    setSortByCountry((prevsState) => !prevsState);
  };

  const handleDelete = (cell: string) => {
    const filteredUsers = users.filter((user) => user.cell !== cell);
    setUsers(filteredUsers);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  const filteredUsers = typeof filterCountry === 'string' && filterCountry.length > 0
    ? users.filter((user) => {
      return user.location.country.toLowerCase().includes(filterCountry.toLowerCase());
    })
    : users;

  const sortedUsers = sortByCountry
    ? [...users].sort((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      })
    : filteredUsers;

  useEffect(() => {
    fetch(apiUsers)
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results);
        originalUsers.current = res.results;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Prueba tabla usuarios :)</h1>
      <header>
        <button onClick={toggleColors}>Color Rows</button>
        <button onClick={toggleSortByCountry}>
          {' '}
          {sortByCountry ? 'Do not order by country' : 'Order by country'}
        </button>
        <button onClick={handleReset}>Reset Users</button>
        <input
          type="text"
          placeholder="Filter by country. Ex: Argentina"
          onChange={(e) => {
            setFilterCountry(e.target.value);
          }}
        />
      </header>
      <main>
        <UsersList
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </div>
  );
}

export default App;
