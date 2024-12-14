import axios from "axios";
import React, { useEffect, useState } from "react";

const UserForm = ({ selectedUser, onUserSaved }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        username: selectedUser.username,
        password: "", // La contraseña no se muestra por seguridad
        role: selectedUser.role,
      });
    } else {
      setFormData({ username: "", password: "", role: "" });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        // Actualizar usuario
        await axios.put(`/api/users/${selectedUser.id}`, formData);
      } else {
        // Crear usuario
        await axios.post("/api/users", formData);
      }
      onUserSaved();
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{selectedUser ? "Editar Usuario" : "Crear Usuario"}</h3>
      <input
        type="text"
        name="username"
        placeholder="Nombre de usuario"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required={!selectedUser} // La contraseña es obligatoria solo al crear
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona un rol</option>
        <option value="ROLE_USER">Usuario</option>
        <option value="ROLE_ADMIN">Administrador</option>
      </select>
      <button type="submit">{selectedUser ? "Actualizar" : "Crear"}</button>
    </form>
  );
};

export default UserForm;
