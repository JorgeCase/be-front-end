import React, { useState } from "react";
import useFetch from "./hooks/userFetch";
import Table from "./components/Table";
import SearchBar from "./components/SearchBar";
import { formatPhoneNumber } from "./utils/formatPhoneNumber";
import { formatDate } from "./utils/formatDate";
import { User } from "./types/User";

const App: React.FC = () => {
  const { data, loading } = useFetch<User>('http://localhost:3000/employees');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrando e formatando os dados
  const filteredUsers = data.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  const formattedUsers = filteredUsers.map(user => ({
    ...user,
    admission_date: formatDate(user.admission_date),
    phone: formatPhoneNumber(user.phone),
  }));

  return (
    <div className="App">
      <SearchBar onSearch={setSearchTerm} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table users={formattedUsers} searchTerm={searchTerm} />
      )}
    </div>
  );
};

export default App;