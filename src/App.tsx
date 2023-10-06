import { useEffect, useState } from 'react';
import './App.css';
import { type User } from './types';
import { UsersList } from './components/UsersList';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const apiUsers = 'https://randomuser.me/api/?results=100';
  const [showColors, setShowColors] = useState(false);

  const toggleColors = () => {
    setShowColors(!showColors);
  };
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
      <header>
        <button onClick={toggleColors}>Color Rows</button>
      </header>
      <main>
        <UsersList showColors={showColors} users={users} />
      </main>
    </div>
  );
}

export default App;
