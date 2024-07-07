import React from 'react';
import Table from '../components/Table';
import { User } from '../types/User';

interface HomeProps {
    users: User[];
    searchTerm: string;
}

const Home: React.FC<HomeProps> = ({ users, searchTerm }) => {
    return (
        <div>
            <h1>User list</h1>
            <Table users={users} searchTerm={searchTerm} />
        </div>
    );
};

export default Home;