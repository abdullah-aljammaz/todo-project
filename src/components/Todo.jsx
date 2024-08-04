import * as React from "react";
import { useContext, useReducer } from "react";
// Context
import { TodosList } from "../contexts/Todos";
import { useToast } from "../contexts/ToastContext";

// Layout
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

// Icons
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// Dialog

// Others
import "../App.css";
import Divider from "@mui/material/Divider";
export default function Todo({ todo, showDelete, showUpdate }) {
  // Contexts
  const { todos, setTodos } = useContext(TodosList);
  const { showHideToast } = useToast();

  const handleUpdateClickOpen = () => {
    showUpdate(todo);
  };

  // === EDIT EVENT HANDLERS ====
  // === UPDATE STATE ====

  // Delete
  const handleDeleteClickOpen = () => {
    showDelete(todo);
  };

  // Make success the todo is finish
  const handleCheckClick = () => {
    const updateTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updateTodos);
    showHideToast(todo.isCompleted ? "تم الاضافة بنجاح" : "تمت الازالة بنجاح");
    localStorage.setItem("tasks", JSON.stringify(updateTodos));
  };

  // ==== EVENT HANDLERS ====
  return (
    <>
      {/* UPDATE DIALOG */}

      {/* ==== UPDATE DIALOG ==== */}
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
