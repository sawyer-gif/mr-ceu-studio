import React, { useEffect, useState } from 'react';
import { Users, LogOut, RefreshCw, Clock, Building2, User } from 'lucide-react';

interface WaitlistEntry {
  id: string;
  fields: {
    Email: string;
    'First Name': string;
    'Last Name': string;
    Firm: string;
    Role: string;
    Status: string;
    'Created At': string;
  };
}

const AdminDashboard: React.FC = () => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/waitlist');
      if (res.ok) {
        const data = await res.json();
        setEntries(data.records || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/';
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F8] text-[#1E1F23] flex flex-col font-sans">
      <header className="h-20 bg-white border-b border-[#E6E7EB] px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-6 bg-[#6F3CC3] rounded-full" />
          <h1 className="text-xl font-black uppercase tracking-tighter">Admin Control Panel</h1>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={fetchEntries} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-600">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-12 max-w-7xl mx-auto w-full">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Waitlist Management</h2>
            <p className="text-[#6B7280] text-xs font-black uppercase tracking-widest">Airtable Feed: Recent Submissions</p>
          </div>
          <div className="bg-white border border-[#E6E7EB] p-6 rounded-[32px] flex items-center gap-8 shadow-sm">
             <div>
               <div className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] mb-1">Total Entries</div>
               <div className="text-2xl font-black text-[#6F3CC3]">{entries.length}</div>
             </div>
             <div className="w-px h-10 bg-[#E6E7EB]" />
             <Users size={24} className="text-[#6F3CC3]/40" />
          </div>
        </div>

        <div className="bg-white border border-[#E6E7EB] rounded-[40px] shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F7F8] border-b border-[#E6E7EB]">
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#9CA3AF]">Contact</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#9CA3AF]">Firm / Role</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#9CA3AF]">Joined</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#9CA3AF]">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="p-20 text-center text-[#9CA3AF] italic">Syncing with Airtable...</td></tr>
              ) : entries.length === 0 ? (
                <tr><td colSpan={4} className="p-20 text-center text-[#9CA3AF] italic">No entries found.</td></tr>
              ) : (
                entries.map(entry => (
                  <tr key={entry.id} className="border-b border-[#E6E7EB] hover:bg-[#F9FAFB] transition-colors">
                    <td className="p-6">
                      <div className="font-bold text-sm">{entry.fields['First Name']} {entry.fields['Last Name']}</div>
                      <div className="text-[11px] text-[#6B7280]">{entry.fields.Email}</div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#1E1F23]">
                        <Building2 size={14} className="text-[#6F3CC3]" /> {entry.fields.Firm}
                      </div>
                      <div className="text-[10px] text-[#6B7280] font-medium uppercase tracking-widest mt-1">{entry.fields.Role}</div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-[11px] text-[#6B7280] font-medium">
                        <Clock size={14} /> {new Date(entry.fields['Created At']).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-[#6F3CC3]/10 text-[#6F3CC3] text-[9px] font-black uppercase tracking-widest rounded-full border border-[#6F3CC3]/20">
                        {entry.fields.Status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;