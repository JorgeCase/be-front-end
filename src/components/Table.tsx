import React, { useEffect, useState } from "react";
import '../styles/Table.css';
import { User } from '../types/User'

interface TableProps {
  users: User[];
  searchTerm: string;
}

const Table: React.FC<TableProps> = ({ users, searchTerm }) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const filteredData = users.filter(
        (user) =>
        user.name.toLowerCase().includes(lowerCaseSearch) ||
        user.job.toLowerCase().includes(lowerCaseSearch) ||
        user.phone.includes(searchTerm)
      );
        setFilteredUsers(filteredData);
    }
  }, [users, searchTerm]);

  return (
    <table className="table">
      <thead className="table-head">
        <tr>
          <th className="table-head-cell">FOTO</th>
          <th className="table-head-cell">NOME</th>
          <th className="table-head-cell">CARGO</th>
          <th className="table-head-cell">DATA DE ADMISSÃO</th>
          <th className="table-head-cell">TELEFONE</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map(user => (
          <tr className="table-row" key={user.id}>
            <td className="table-cell"><img src={user.image} alt={user.name} /></td>
            <td className="table-cell">{user.name}</td>
            <td className="table-cell">{user.job}</td>
            <td className="table-cell">{user.admission_date}</td>
            <td className="table-cell">{user.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;