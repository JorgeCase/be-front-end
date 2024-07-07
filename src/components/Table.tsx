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
        <table>
            <thead>
                <tr>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th>Função</th>
                    <th>Data de admissão</th>
                    <th>Telefone</th>
                </tr>
            </thead>
            <tbody>
                {filteredUsers.map(user => (
                    <tr key={user.id}>
                        <td><img src={user.image} alt={user.name} /></td>
                        <td>{user.name}</td>
                        <td>{user.job}</td>
                        <td>{user.admission_date}</td>
                        <td>{user.phone}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;