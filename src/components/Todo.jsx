import * as React from "react";
import { useContext, useState } from "react";
import { TodosList } from "../contexts/Todos";

// Layout
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

// Icons
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Others
import TextField from "@mui/material/TextField";
import "../App.css";
import Divider from "@mui/material/Divider";
export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodosList);

  // EVENT HANDLERS

  // EDIT EVENT HANDLERS
  // UPDATE STATE
  const [openUpdate, setOpenUpdate] = useState(false);

  // new date for task
  const [newTaskValues, setNewTaskValues] = useState({
    title: todo.title,
    details: todo.details,
  });

  // Update the Task
  const taskUpdatedValue = (e) => {
    setNewTaskValues({ ...newTaskValues, [e.target.name]: e.target.value });
  };

  const handleUpdateClickOpen = () => {
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  const handleUpdateConfirm = () => {
    if (newTaskValues.title.trim() || newTaskValues.details.trim()) {
      const updateTodos = todos.map((task) => {
        if (task.id === todo.id) {
          return {
            ...task,
            title: newTaskValues.title,
            details: newTaskValues.details,
          };
        } else {
          return task;
        }
      });
      setTodos(() => {
        localStorage.setItem("tasks", JSON.stringify(updateTodos));
        handleUpdateClose();
        return updateTodos;
      });
    } else {
      handleDeleteClickOpen();
    }
  };

  // === EDIT EVENT HANDLERS ====
  // === UPDATE STATE ====

  // DELETE EVENT HANDLERS
  // DELETE STATE
  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteClickOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleDeleteConfirm = () => {
    const deleteTodoById = todos.filter((t) => todo.id !== t.id);

    // to Update the List
    setTodos(deleteTodoById);
    localStorage.setItem("tasks", JSON.stringify(deleteTodoById));

    // Close the Dialog
    handleDeleteClose();
  };
  // ==== DELETE EVENT HANDLERS ====

  // Make success the todo is finish
  const handleCheckClick = () => {
    const updateTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updateTodos);
    localStorage.setItem("tasks", JSON.stringify(updateTodos));
  };

  // ==== EVENT HANDLERS ====
  return (
    <>
      {/* UPDATE DIALOG */}
      <Dialog
        dir="rtl"
        open={openUpdate}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>تعديل إسم المهمة</DialogTitle>
        <DialogContent>
          <DialogContentText>قم بوضع اسم المهمة الجديدة</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="عنوان المهمة"
            type="text"
            fullWidth
            variant="standard"
            onChange={taskUpdatedValue}
            value={newTaskValues.title}
          />
          <TextField
            autoFocus
            margin="dense"
            id="details"
            name="details"
            label="التفاصيل"
            type="text"
            fullWidth
            variant="standard"
            onChange={taskUpdatedValue}
            value={newTaskValues.details}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>إغلاق</Button>
          <Button type="submit" onClick={handleUpdateConfirm}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== UPDATE DIALOG ==== */}

      {/* DELETE DIALOG */}
      <Dialog
        dir="rtl"
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من رغبتك في حذف المهمة
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لايمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>إغلاق</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            نعم, قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== DELETE DIALOG ==== */}
      <Card
        className="todoCard"
        sx={{
          minWidth: "275px",
          background: todo.isCompleted ? "#131946" : "#283593",
          color: "white",
          marginTop: "5%",
          // opacity: todo.isCompleted ? "0.7" : "1",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              xs={6}
              sm={8}
              sx={{
                opacity: todo.isCompleted ? ".4" : 1,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{ textAlign: "right", fontWeight: "300" }}
              >
                {todo.details}
              </Typography>
            </Grid>

            {/* Action buttons */}
            <Grid
              xs={6}
              sm={4}
              display="flex"
              justifyContent={{
                xs: "space-evenly",
                sm: "space-around",
              }}
              alignItems="center"
            >
              {/* Check icon */}

              <IconButton
                onClick={handleCheckClick}
                className="iconButton"
                aria-label="check"
                sx={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: `solid #8bc34a 3px`,
                  opacity: todo.isCompleted ? ".8" : 1,
                }}
              >
                <CheckIcon />
              </IconButton>

              {/* Update icon */}
              <IconButton
                onClick={handleUpdateClickOpen}
                className="iconButton"
                aria-label="check"
                sx={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
                disabled={todo.isCompleted ? true : false}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>

              {/* Delete icon */}
              <IconButton
                className="iconButton"
                aria-label="check"
                onClick={handleDeleteClickOpen}
                sx={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                  opacity: todo.isCompleted ? ".8" : 1,
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
            {/* ==Action buttons== */}
          </Grid>
        </CardContent>
      </Card>
      <Divider />
    </>
  );
}
