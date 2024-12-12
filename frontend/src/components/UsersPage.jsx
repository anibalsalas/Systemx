import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'; // Importar componentes de react-bootstrap

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  //const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: '' });
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 1 });

  const [editingUsers, setEditingUsers] = useState(null);

  // Cargar usuarios
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/users')
      .then((response) => {
        setUsers(response.data); // Cuando recibimos los datos de los usuarios, los almacenamos en el estado `users`
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);// El arreglo vacío indica que este efecto se ejecutará solo una vez al cargar el componente

  // Manejar creación de usuario
  const handleCreateUser = () => {
    axios.post('http://localhost:8080/api/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ username: '', email: '', password: '', role: 1 }); 
      })
      .catch(error => console.error('Error creating user:', error));
  };

  // Manejar edición de usuario
  const handleEditUsers = () => {
    if (editingUsers) {
      axios
        .put(`http://localhost:8080/api/users/${editingUsers.id}`, editingUsers)
        .then((response) => {
          const updatedUsers = users.map((user) =>
            user.id === editingUsers.id ? response.data : user
          );
          setUsers(updatedUsers);
          setEditingUsers(null); // Limpiar el estado de edición
        })
        .catch((error) => console.error("Error editing user:", error));
    }
  };

  // Manejar eliminación de usuario
  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/api/users/${id}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  // Manejar cambios en los inputs
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === 'role') {
  //     const selectedRoles = Array.from(e.target.selectedOptions, (option) => option.value);
  //     if (editingUsers) {
  //       setEditingUsers({ ...editingUsers, role: selectedRoles });
  //     } else {
  //       setNewUser({ ...newUser, role: selectedRoles });
  //     }
  //   } else {
  //     if (editingUsers) {
  //       setEditingUsers({ ...editingUsers, [name]: value });
  //     } else {
  //       setNewUser({ ...newUser, [name]: value });
  //     }
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'role') {
      const numericValue = Number(value); // Convertir a número
      if (editingUsers) {
        setEditingUsers({ ...editingUsers, role: numericValue });
      } else {
        setNewUser({ ...newUser, role: numericValue });
      }
    } else {
      if (editingUsers) {
        setEditingUsers({ ...editingUsers, [name]: value });
      } else {
        setNewUser({ ...newUser, [name]: value });
      }
    }
  };

  // Seleccionar un usuario para editar
  const handleSelectEditUsers = (user) => {
    setEditingUsers(user);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Gestión de Usuarios</h2>

      {/* Formulario de agregar o editar usuario */}
      <div className="mb-5">
        <h3>{editingUsers ? "Editar Usuario" : "Agregar Nuevo Usuario"}</h3>
        
        <Form>
          <Row className="mb-3">
            <Col sm={12} md={6}>
              <Form.Group controlId="formUsername">
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Nombre de Usuario"
                  value={editingUsers ? editingUsers.username : newUser.username}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={editingUsers ? editingUsers.email : newUser.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col sm={12} md={6}>
              <Form.Group controlId="formPassword">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={editingUsers ? editingUsers.password : newUser.password}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
            <Form.Group controlId="formRoles">
              <Form.Control
                as="select"
                name="role"
                value={editingUsers ? editingUsers.role : newUser.role} // Asegúrate de usar `role` en lugar de `roles`
                onChange={handleInputChange}
              >
                <option value="1">Usuario</option>
                <option value="2">Admin</option>
              </Form.Control>
            </Form.Group>
            </Col>
          </Row>
          
          <Button
            onClick={editingUsers ? handleEditUsers : handleCreateUser}
            variant="primary"
            className="w-100"
          >
            {editingUsers ? "Guardar cambios" : "Agregar Usuario"}
          </Button>
        </Form>
      </div>

      {/* Lista de usuarios en una tabla responsive */}
      <h3 className="mb-4">Lista de Usuarios</h3>
      <div className="table-responsive">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre de Usuario</th>
              <th>Email</th>
              <th>Password</th>
              <th>Roles</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{Array.isArray(user.roles) ? user.roles.join(", ") : "Sin roles"}</td>

                <td>
                  <Button
                    onClick={() => handleSelectEditUsers(user)}
                    variant="warning"
                    size="sm"
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    variant="danger"
                    size="sm"
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default UsersPage;
