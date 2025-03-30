import axios from "axios";
import Sidebar from "../Sidebar/sidebar";
import MotionHoc from "./MotionHoc";
import React, { useState, useEffect } from "react";
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, Button, Box, Modal, Rating, CardContent } from "@mui/material";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import SingleView from "./SingleView";
import { Link } from "react-router-dom";

// import './team.css'

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
  width: 'auto',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
  borderRadius: "25px",
};

// const TeamComponent = () => {
const Allrecipe = () => {

  const [students, setStudents] = useState(['']);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [count, setCount] = useState(false);

// Inside your useEffect hook in Allrecipe component
useEffect(() => {
  axios
  .get("http://localhost:7000/api/recipe/getAllRecipes")
  .then((response) => {
    // Ensure the response contains 'recipes' array
    setStudents(response.data.recipes || []);
    // console.log(response, 'recipe')
    })
    .catch((error) => {
      console.log(error);
    });
}, []);
 

  // console.log(students);
  
  const handleDeleteSingleuser = () => setOpenViewSingledelete(false);
  const [openViewSingleDelete, setOpenViewSingledelete] = React.useState(false);

  const handleOpenViewSingledelete = (student) => {
    setOpenViewSingledelete(true);
  };

  const handleCloseViewSingle = () => setOpenViewSingle(false);
  const [openViewSingle, setOpenViewSingle] = React.useState(false);
  const handleOpenViewSingle = (student) => {
    setOpenViewSingle(true);
    setSelectedStudent(student);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = (student) => {
    setOpen(true);
    // console.log(student);
    setSelectedStudent(student);
  };

  // console.log(students, 'recipe id')

  const handleDeleteUser = (recipeId) => {
    axios.delete(`http://localhost:7000/api/recipe/deleterecipe/${recipeId}`)
      .then((response) => {
        setOpenViewSingledelete(false); // Close delete confirmation modal
      })
      .catch((error) => {
        console.log(error);
        setOpenViewSingledelete(false); // Close delete confirmation modal on error
      });
  };
  


  return (
    <>
      {/* <Sidebar /> */}
      <div style={{marginLeft:'80px', marginRight:'60px', paddingTop:'60px', paddingBottom:'50px'}}>
      <h1 className="Userinfo" style={{paddingBottom:'30px'}}>Recipe Information</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sl No</StyledTableCell>
                <StyledTableCell align="Left">Profile</StyledTableCell>
                <StyledTableCell>Recipe Name</StyledTableCell>
                <StyledTableCell align="left">Recipe Id</StyledTableCell>
                <StyledTableCell align="Left">Duration</StyledTableCell>
                <StyledTableCell align="Left">Rating</StyledTableCell>
                {/* <StyledTableCell align="left">Discription</StyledTableCell> */}
                {/* <StyledTableCell align="left">Needed Items</StyledTableCell>
                <StyledTableCell align="left">Steps to prepare</StyledTableCell> */}
                <StyledTableCell align="left">View</StyledTableCell>
                <StyledTableCell align="left">Update</StyledTableCell>
                <StyledTableCell align="left">Delete</StyledTableCell>
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
                      src={`http://localhost:7000/uploads/recipe/${row.profile}`}
                      alt="Profile"
                      style={{ width: "70px", height: "70px" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.recipeName}</StyledTableCell>
                  <StyledTableCell align="left">{row.recipeId}</StyledTableCell>
                  <StyledTableCell align="left">{row.recipeTime}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Rating
                      name="recipe-rating"
                      value={row.recipeRating}
                      readOnly
                    />
                  </StyledTableCell>
                  {/* <StyledTableCell align="left">{row.recipeDescription}</StyledTableCell> */}
                  <StyledTableCell align="left">
                    <Button
                      onClick={() => handleOpenViewSingle(row)}
                      variant="outlined"
                      color="success"
                    >
                      View
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                      <Link to={`/updaterecipe/${row._id}`}>
                      <Button variant="outlined" color="success">
                        Update
                      </Button>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                      <Button variant="outlined" color="success" onClick={() => handleOpenViewSingledelete(row)}>
                        Delete
                      </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}

            </TableBody>
              <Modal
                open={openViewSingle}
                onClose={handleCloseViewSingle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <CardContent>
                    <SingleView selectedStudent={selectedStudent} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                      <Button
                        onClick={handleCloseViewSingle}
                        variant="outlined"
                        color="error"
                        fullWidth
                      >
                        Close
                      </Button>
                    </Box>
                  </CardContent>
                </Box>

              </Modal>
              <Modal
                open={openViewSingleDelete}
                onClose={handleDeleteSingleuser}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <CardContent>
                      <h1>Are you sure want to delete the recipe..!</h1>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Button
                        onClick={handleDeleteUser}

                        variant="outlined"
                        color="error"
                        fullWidth
                      >
                        Yse
                      </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button
                        onClick={handleDeleteSingleuser}
                        variant="outlined"
                        color="success"
                        fullWidth
                      >
                        No
                      </Button>
                    </Box>
                  </CardContent>
                </Box>

              </Modal>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

// const Team = MotionHoc(TeamComponent);

// export default Team;
export default Allrecipe;