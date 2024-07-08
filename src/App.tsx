import React, { useState } from "react";
import useFetch from "./hooks/userFetch";
import Table from "./components/Table";
// import SearchBar from "./components/SearchBar";
import { formatPhoneNumber } from "./utils/formatPhoneNumber";
import { formatDate } from "./utils/formatDate";
import { User } from "./types/User";

const App: React.FC = () => {
  const { data, loading } = useFetch<User>('http://localhost:3000/employees');
  const [searchTerm, setSearchTerm] = useState('');
  const [error] = useState<string | null>(null);

  // Filtrando e formatando os dados
  const filteredUsers = data.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  const formattedUsers = filteredUsers.map(user => ({
    ...user,
    admission_date: formatDate(user.admission_date), // Formata a data de admissão
    phone: formatPhoneNumber(user.phone), // Formata o número do telefone
  }));

  // Tratamento de erro
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Renderização da aplicação com feedback
  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <img src="/path/to/logo.png" alt="Logo" />
        </div>
      </header>
      <p></p>
      <div className="search-header">
        <h1 className="title">Funcionários</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">
            <img src="/path/to/search-icon.png" alt="Search" />
          </button>
        </div>
      </div>
      {loading? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          <Table users={formattedUsers} searchTerm={searchTerm} />
        </div>
      )}
    </div>
  );
};

export default App;