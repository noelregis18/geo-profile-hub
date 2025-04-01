
import React from 'react';
import AdminPanel from '@/components/AdminPanel';
import Navbar from '@/components/Navbar';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container px-4 py-8">
        <AdminPanel />
      </main>
    </div>
  );
};

export default Admin;
