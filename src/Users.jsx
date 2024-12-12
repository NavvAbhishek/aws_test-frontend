import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import Axios from "axios";
import { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    Axios.get("http://localhost:3001/api/users")
      .then((response) => {
        setUsers(response.data?.response || []);
      })
      .catch((error) => {
        console.error("Axios error: ", error);
      });
  };

  const addUser = (data) => {
    setSubmitted(true);
    const payload = {
      id: data.id,
      name: data.name,
    };
    Axios.post("http://localhost:3001/api/add", payload)
      .then(() => {
        getUsers();
        setSubmitted(false);
      })
      .catch((error) => {
        console.error("Axios error: ", error);
      });
  };

  const updateUser = (data) => {
    setSubmitted(true);
    const payload = {
      id: data.id,
      name: data.name,
    };
    Axios.put("http://localhost:3001/api/update", payload)
      .then(() => {
        getUsers();
        setSubmitted(false);
        isEdit(false);
      })
      .catch((error) => {
        console.error("Axios error: ", error);
      });
  };

  const deleteUser = (data) => {
    Axios.post("http://localhost:3001/api/delete",data)
      .then(() => {
        getUsers(); 
      })
      .catch((error) => {
        console.error("Axios error: ", error);
      });
  }

  return (
    <Box
      sx={{ width: "calc(100% - 100px)", margin: "auto", marginTop: "100px" }}
    >
      <UserForm
        addUser={addUser}
        submitted={submitted}
        data={selectedUser}
        isEdit={isEdit}
        updateUser={updateUser}
      />
      <UsersTable
        rows={users}
        selectedUser={(data) => {
          setSelectedUser(data);
          setIsEdit(true);
        }}
        deleteUser={data => window.confirm('Are you sure?') && deleteUser(data)}
      />
    </Box>
  );
};

export default Users;
