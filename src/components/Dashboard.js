// src/Dashboard.js
import React from 'react';
import ApiChainBuilder from './ApiChainBuilder';

const Dashboard = () => {
    return (
        <div className="container mx-auto p-4 md:p-8 lg:p-12">
            <h1 className="text-3xl font-bold text-center mb-6">API Chaining Demo</h1>
            <ApiChainBuilder />
        </div>
    );
};

export default Dashboard;
