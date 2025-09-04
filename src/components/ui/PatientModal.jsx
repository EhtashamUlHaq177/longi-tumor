import React, { useState } from 'react';
import axios from 'axios';


export default function PatientModal({ isOpen, onClose, onCreated }) {
const [name, setName] = useState('');
const [age, setAge] = useState('');
const [sex, setSex] = useState('Male');


const handleSubmit = async (e) => {
e.preventDefault();
try {
const res = await axios.post('http://localhost:5000/api/patients', { name, age: Number(age), sex });
if (res.data?.success) {
onCreated(res.data.patient);
onClose();
}
} catch (err) {
console.error(err);
alert('Failed to create patient');
}
};


if (!isOpen) return null;
return (
<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
<div className="bg-white p-6 rounded-lg w-96">
<h3 className="text-lg font-semibold mb-4">Add New Patient</h3>
<form onSubmit={handleSubmit} className="space-y-3">
<input className="w-full p-2 border" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
<input className="w-full p-2 border" placeholder="Age" type="number" value={age} onChange={e => setAge(e.target.value)} required />
<select className="w-full p-2 border" value={sex} onChange={e => setSex(e.target.value)}>
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>
<div className="flex justify-end space-x-2">
<button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
<button type="submit" className="px-3 py-1 bg-[var(--medical-red)] text-white rounded">Save</button>
</div>
</form>
</div>
</div>
);
}