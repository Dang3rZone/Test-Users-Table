import { useEffect, useState } from 'react';
import './App.css';
import { type User } from './types';
import { UsersList } from './components/UsersList';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const apiUsers = 'https://randomuser.me/api/?results=100';

  useEffect(() => {
    fetch(apiUsers)
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Prueba tabla usuarios :)</h1>
      <UsersList users={users} />
    </div>
  );
}

export default App;
