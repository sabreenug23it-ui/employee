import React, { useState } from "react";
import "./App.css";

function EmployeeCard({ employee, onRemove }) {
  return (
    <div className="card">
      <img
        src={employee.photo || "https://via.placeholder.com/120"}
        alt={employee.name}
      />
      <h3>{employee.name}</h3>
      <p>{employee.role}</p>
      <button className="delete-btn" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}

function EmployeeForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", role: "", photo: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.role) {
      alert("Please enter both name and role!");
      return;
    }
    onAdd(form);
    setForm({ name: "", role: "", photo: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <input
        type="text"
        name="name"
        placeholder="Employee Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="role"
        placeholder="Employee Role"
        value={form.role}
        onChange={handleChange}
      />
      <input
        type="url"
        name="photo"
        placeholder="Photo URL"
        value={form.photo}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function App() {
  const [employees, setEmployees] = useState([]);

  const addEmployee = (emp) => {
    setEmployees((prev) => [...prev, emp]);
  };

  const removeEmployee = (index) => {
    setEmployees((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <header>
        <h1>Employee Directory</h1>
        <p>Total Employees: {employees.length}</p>
      </header>

      <EmployeeForm onAdd={addEmployee} />

      <div className="employee-list">
        {employees.map((emp, idx) => (
          <EmployeeCard
            key={idx}
            employee={emp}
            onRemove={() => removeEmployee(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
