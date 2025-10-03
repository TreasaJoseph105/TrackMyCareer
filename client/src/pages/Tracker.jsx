import React, { useState, useEffect } from 'react';
import axios from '../services/api'; // make sure this points to your backend

const statusOptions = ['Applied', 'Interview', 'Rejected', 'Hired'];

const statusColors = {
  Applied: 'bg-gold text-black',
  Interview: 'bg-blue-600 text-white',
  Rejected: 'bg-red-600 text-white',
  Hired: 'bg-green-600 text-white'
};

const Tracker = ({ userId }) => {
  const [trackers, setTrackers] = useState([]);
  const [form, setForm] = useState({ company: '', role: '', status: 'Applied', deadline: '', notes: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ company: '', role: '', status: 'Applied', deadline: '', notes: '' });
  const [loading, setLoading] = useState(false);

  // Fetch tracker data
  const fetchTrackers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/tracker/${userId}`);
      setTrackers(res.data);
    } catch (err) {
      console.error('Error fetching trackers:', err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchTrackers(); }, []);

  // Add a new job
  const addTracker = async (e) => {
    e.preventDefault();
    if (!form.company || !form.role) return;
    setLoading(true);
    try {
      await axios.post('/tracker', { ...form, userId });
      setForm({ company: '', role: '', status: 'Applied', deadline: '', notes: '' });
      fetchTrackers();
    } catch (err) {
      console.error('Error adding tracker:', err);
    }
    setLoading(false);
  };

  // Delete job
  const deleteTracker = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    setLoading(true);
    try {
      await axios.delete(`/tracker/${id}`);
      fetchTrackers();
    } catch (err) {
      console.error('Error deleting tracker:', err);
    }
    setLoading(false);
  };

  // Start editing
  const startEdit = (tracker) => {
    setEditingId(tracker._id);
    setEditForm({
      company: tracker.company,
      role: tracker.role,
      status: tracker.status,
      deadline: tracker.deadline ? tracker.deadline.slice(0, 10) : '',
      notes: tracker.notes
    });
  };

  // Save edited job
  const saveEdit = async (id) => {
    if (!editForm.company || !editForm.role) return;
    setLoading(true);
    try {
      await axios.put(`/tracker/${id}`, { ...editForm });
      setEditingId(null);
      fetchTrackers();
    } catch (err) {
      console.error('Error saving edit:', err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-black rounded-xl shadow-lg text-white">
      <h2 className="text-3xl font-bold text-center text-gold mb-8">Job Tracker</h2>

      {/* Add Form */}
      <form onSubmit={addTracker} className="flex flex-wrap gap-4 mb-8">
        <input
          placeholder="Company"
          value={form.company}
          onChange={e => setForm({ ...form, company: e.target.value })}
          className="flex-1 min-w-[120px] p-2 rounded border border-gold bg-gray-800 text-white"
        />
        <input
          placeholder="Role"
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          className="flex-1 min-w-[120px] p-2 rounded border border-gold bg-gray-800 text-white"
        />
        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
          className="flex-1 min-w-[120px] p-2 rounded border border-gold bg-gray-800 text-white"
        >
          {statusOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <input
          type="date"
          value={form.deadline}
          onChange={e => setForm({ ...form, deadline: e.target.value })}
          className="flex-1 min-w-[120px] p-2 rounded border border-gold bg-gray-800 text-white"
        />
        <input
          placeholder="Notes"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          className="flex-2 min-w-[160px] p-2 rounded border border-gold bg-gray-800 text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gold text-black font-bold px-4 py-2 rounded hover:bg-yellow-500 transition"
        >Add</button>
      </form>

      {/* Tracker Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse text-white">
          <thead>
            <tr className="bg-gray-800 text-gold">
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Deadline</th>
              <th className="px-4 py-2">Notes</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trackers.map(t => (
              <tr key={t._id} className={`${editingId === t._id ? 'bg-gray-700' : 'bg-gray-900'} hover:bg-gray-800 transition`}>
                {editingId === t._id ? (
                  <>
                    <td><input value={editForm.company} onChange={e => setEditForm({ ...editForm, company: e.target.value })} className="w-full p-2 rounded border border-gold bg-gray-800 text-white" /></td>
                    <td><input value={editForm.role} onChange={e => setEditForm({ ...editForm, role: e.target.value })} className="w-full p-2 rounded border border-gold bg-gray-800 text-white" /></td>
                    <td>
                      <select value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })} className="w-full p-2 rounded border border-gold bg-gray-800 text-white">
                        {statusOptions.map(opt => <option key={opt}>{opt}</option>)}
                      </select>
                    </td>
                    <td><input type="date" value={editForm.deadline} onChange={e => setEditForm({ ...editForm, deadline: e.target.value })} className="w-full p-2 rounded border border-gold bg-gray-800 text-white" /></td>
                    <td><input value={editForm.notes} onChange={e => setEditForm({ ...editForm, notes: e.target.value })} className="w-full p-2 rounded border border-gold bg-gray-800 text-white" /></td>
                    <td className="flex gap-2 justify-center">
                      <button type="button" onClick={() => saveEdit(t._id)} disabled={loading} className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded font-bold transition">Save</button>
                      <button type="button" onClick={() => setEditingId(null)} disabled={loading} className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded font-bold transition">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{t.company}</td>
                    <td>{t.role}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-sm font-semibold ${statusColors[t.status]}`}>{t.status}</span>
                    </td>
                    <td>{t.deadline ? new Date(t.deadline).toLocaleDateString() : ''}</td>
                    <td>{t.notes}</td>
                    <td className="flex gap-2 justify-center">
                      <button type="button" onClick={() => startEdit(t)} disabled={loading} className="bg-gold text-black px-3 py-1 rounded font-bold hover:bg-yellow-500 transition">Edit</button>
                      <button type="button" onClick={() => deleteTracker(t._id)} disabled={loading} className="bg-red-600 px-3 py-1 rounded font-bold hover:bg-red-500 transition">Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {trackers.length === 0 && (
        <div className="text-center text-gold mt-6">
          No jobs tracked yet. Add your first job above!
        </div>
      )}
    </div>
  );
};

export default Tracker;
