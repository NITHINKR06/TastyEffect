import axios from "axios";
import Sidebar from "../Sidebar/sidebar";
import React, { useState, useEffect } from "react";
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, Button, Box, Modal, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import './team.css'
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
  borderRadius: "25px",
};

const Team = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openViewSingle, setOpenViewSingle] = useState(false);
  const [updateUserInfo, setUpdateUserInfo] = useState({});
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    axios
      .get("http://localhost:7000/api/user/getAllUsers")
      .then((response) => {
        setStudents(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCloseViewSingle = () => setOpenViewSingle(false);
  
  const handleOpenViewSingle = (student) => {
    setOpenViewSingle(true);
    setSelectedStudent(student);
  };

  const handleOpenUpdate = (user) => {
    setUpdateUserInfo(user);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateUser = () => {
    // Make request to update user info
    axios.put(`http://localhost:7000/api/user/updateUser/${updateUserInfo._id}`, updateUserInfo)
      .then(response => {
        console.log("User info updated successfully:", response.data);
        // Update the state or perform any necessary actions upon successful update
        handleCloseUpdate();
      })
      .catch(error => {
        console.error("Error updating user info:", error);
        // Handle error
      });
  };

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // State to manage delete confirmation modal visibility
  const [userToDeleteId, setUserToDeleteId] = useState(null); // State to store the id of the user to delete
  
  // Function to open delete confirmation modal
  const handleOpenDeleteConfirmation = (id) => {
    setUserToDeleteId(id); // Set the id of the user to delete
    setDeleteConfirmationOpen(true); // Open delete confirmation modal
  };
  
  // Function to close delete confirmation modal
  const handleCloseDeleteConfirmation = () => {
    setUserToDeleteId(null); // Reset user id
    setDeleteConfirmationOpen(false); // Close delete confirmation modal
  };
  
  // Function to handle user deletion
  const handleDeleteUser = () => {
    // Make a request to delete user
    // You can use axios.delete method here
    // Send userToDeleteId to backend
    // Upon successful response, update students state or fetch data again
    // Remember to handle errors as well
    axios.delete(`http://localhost:7000/api/user/deleteUser/${userToDeleteId}`)
      .then((response) => {
        console.log(response.data);
        // If deletion is successful, update the state to reflect the changes
        setStudents(students.filter(student => student._id !== userToDeleteId));
        handleCloseDeleteConfirmation(); // Close delete confirmation modal
      })
      .catch((error) => {
        console.log(error);
        handleCloseDeleteConfirmation(); // Close delete confirmation modal on error
      });
  };

  return (
    <div style={{ backgroundColor: '#4158D0', backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)', height: '100vh' }}>
      <Sidebar />
        <Link to={'/adminProfile'}>
          <Button variant="contained" color="success" sx={{marginTop:10}}>
            Goto Home
          </Button>
        </Link>
      <div style={{ marginLeft: '120px', marginRight: '80px', paddingTop: '50px' }}>
        <h1 className="Userinfo" style={{ paddingBottom: '30px' }}>User Information</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sl No</StyledTableCell>
                <StyledTableCell align="left">Profile</StyledTableCell>
                <StyledTableCell>User Name</StyledTableCell>
                {/* <StyledTableCell align="right">User Id</StyledTableCell> */}
                <StyledTableCell align="left">Email</StyledTableCell>
                {/* <StyledTableCell align="right">View</StyledTableCell> */}
                {/* <StyledTableCell align="right">Update</StyledTableCell> */}
                {/* <StyledTableCell align="right">Delete</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((row, index) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <img
                      src={`http://localhost:7000/uploads/user/${row.profile}`}
                      alt="user Profile"
                      style={{ width: "70px", height: "70px" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  {/* <StyledTableCell align="right">{row._id}</StyledTableCell> */}
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  {/* <StyledTableCell align="right">
                    <Button
                      onClick={() => handleOpenViewSingle(row)}
                      variant="outlined"
                      color="success"
                    >
                      View
                    </Button>
                  </StyledTableCell> */}
                  {/* <StyledTableCell align="right">
                    <Button
                      onClick={() => handleOpenUpdate(row)}
                      variant="outlined"
                      color="success"
                    >
                      Update
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      onClick={() => handleOpenDeleteConfirmation(row._id)} // Pass user id to delete function
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </StyledTableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


        <Modal
          open={openViewSingle}
          onClose={handleCloseViewSingle}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* Display single user info here */}
            {/* You can create a separate component for this */}
          </Box>
        </Modal>


        <Modal
          open={openUpdateModal}
          onClose={handleCloseUpdate}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              label="Name"
              value={updateUserInfo.name || ''}
              onChange={(e) => setUpdateUserInfo({ ...updateUserInfo, name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={updateUserInfo.email || ''}
              onChange={(e) => setUpdateUserInfo({ ...updateUserInfo, email: e.target.value })}
              fullWidth
              margin="normal"
            />
            {/* Add fields for other user information to be updated */}
            <Button onClick={handleUpdateUser} variant="outlined" color="primary">Update</Button>
            <Button onClick={handleCloseUpdate} variant="outlined" color="error" style={{ marginLeft: '10px' }}>Cancel</Button>
          </Box>
        </Modal>

        <Modal
          open={deleteConfirmationOpen}
          onClose={handleCloseDeleteConfirmation}
          aria-labelledby="delete-confirmation-modal-title"
          aria-describedby="delete-confirmation-modal-description"
        >
          <Box sx={style}>
            <p>Are you sure you want to delete this user?</p>
            <Button onClick={handleDeleteUser} variant="contained" color="primary">Yes</Button>
            <Button onClick={handleCloseDeleteConfirmation} variant="contained" color="secondary">No</Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Team;
