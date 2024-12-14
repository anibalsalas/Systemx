import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'; // Importar componentes de react-bootstrap

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  //const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: '' });
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role_id: 1 });

  const [editingUsers, setEditingUsers] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Cambia el estado de carga a false después de la solicitud
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Cargando usuarios...</div>; // Mensaje de carga
  }
  // // Cargar usuarios
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/users');
  //       console.log('Usuarios cargados:', response.data);

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       console.log(data);
  //       setUsers(data);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  // Manejar creación de usuario
  const handleCreateUser  = () => {
    axios.post('http://localhost:8080/api/users', newUser )
        .then(response => {
          console.log('Respuesta del servidor:', response.data);
            // Agrega el nuevo usuario a la lista de usuarios
            setUsers(prevUsers => [...prevUsers, response.data]);
  
            // Reinicia el estado de newUser 
            setNewUser ({ username: '', email: '', password: '', role_id: 1 });
        })
        .catch(error => {
            if (error.response) {
                // La solicitud se realizó y el servidor respondió con un código de estado
                console.error('Error creating user:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                // La solicitud se realizó pero no se recibió respuesta
                console.error('No response received:', error.request);
            } else {
                // Algo sucedió al configurar la solicitud
                console.error('Error setting up request:', error.message);
            }
        });
};
//   const handleCreateUser  = () => {
//     axios.post('http://localhost:8080/api/users', newUser )
//         .then(response => {
//             setUsers([...users, response.data]);
//             setNewUser ({ username: '', email: '', password: '', role_id: 1 });
//         })
//         .catch(error => {
//             if (error.response) {
//                 // La solicitud se realizó y el servidor respondió con un código de estado
//                 console.error('Error creating user:', error.response.data);
//                 console.error('Status code:', error.response.status);
//             } else if (error.request) {
//                 // La solicitud se realizó pero no se recibió respuesta
//                 console.error('No response received:', error.request);
//             } else {
//                 // Algo sucedió al configurar la solicitud
//                 console.error('Error setting up request:', error.message);
//             }
//         });
// };

  // Manejar edición de usuario
  // const handleEditUsers = () => {
  //   if (editingUsers) {
  //     axios
  //       .put(`http://localhost:8080/api/users/${editingUsers.id}`, editingUsers)
  //       .then((response) => {
  //         const updatedUsers = users.map((user) =>
  //           user.id === editingUsers.id ? response.data : user
  //         );
  //         setUsers(updatedUsers);
  //         setEditingUsers(null); // Limpiar el estado de edición
  //       })
  //       .catch((error) => console.error("Error editing user:", error));
  //   }
  // };
  const handleEditUsers = () => {
    if (editingUsers) {
        // Asegúrate de que editingUsers tenga el role_id correcto
        console.log("Editing user data before update:", editingUsers);
        
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

    // Si el campo es 'role', se espera que el value sea el id del rol
    if (name === 'role') {
        const numericValue = Number(value); // Convertir el valor a número
        if (editingUsers) {
            // Actualizar el rol del usuario que se está editando
            setEditingUsers({ ...editingUsers, role_id: numericValue }); 
        } else {
            // Actualizar el rol del nuevo usuario
            setNewUser ({ ...newUser , role_id: numericValue }); 
        }
    } else {
        // Manejo de otros campos
        if (editingUsers) {
            // Actualizar otros campos del usuario que se está editando
            setEditingUsers({ ...editingUsers, [name]: value });
        } else {
            // Actualizar otros campos del nuevo usuario
            setNewUser ({ ...newUser , [name]: value });
        }
    }
};

// Seleccionar un usuario para editar
const handleSelectEditUsers = (user) => {
    // Establecer el usuario seleccionado para editar
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
                  value={
                    editingUsers ? editingUsers.username : newUser.username
                  }
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
                  value={
                    editingUsers ? editingUsers.password : newUser.password
                  }
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group controlId="formRoles">
                <Form.Control
                  as="select"
                  name="role"
                  value={editingUsers ? editingUsers.role_id : newUser.role_id}
                  onChange={handleInputChange}>
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
      <div className="table-responsive">
        <h2>Lista Usuarios ({users.length})</h2>
        {users.length === 0 && <p>No hay usuarios</p>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de Usuario</th>
              <th>Email</th>
              <th>Password</th>
              <th>Roles</th>
              <th>Fecha Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(
                (user, index) => (
                  console.log("Users full data:", users),
                  (
                    <tr key={user.id || index}>
                      <td>{user.id || "N/A"}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>******</td>
                      <td>{user.role ? user.role.name : "Sin rol"}</td>{" "}
                      {/* Mostrar el nombre del rol */}
                      <td>
                        {user.createdAt
                          ? user.createdAt
                          : "Fecha no disponible"}
                      </td>
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
                  )
                )
              )
            ) : (
              <tr>
                <td colSpan="7">No hay usuarios disponibles</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default UsersPage;
