import * as React from "react";
import { useContext, useEffect, useState, useMemo, useReducer } from "react";
import TodosReducer from "../reducers/TodosReducer";
// Layouts
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// Buttons & Inputs
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Grid
import Grid from "@mui/material/Unstable_Grid2";

// Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Components
import Todo from "./Todo";
// Contexts
import { useToast } from "../contexts/ToastContext";
// for new todo

export default function List() {
  console.clear();
  console.log(
    `%cre render - %c${new Date().toLocaleTimeString()}`,
    "font-size:50px",
    "font-size:50px; color:#00cf00"
  );

  // Contexts
  // const { todos2, setTodos } = useContext(TodosList);
  const { showHideToast } = useToast();
  const [todos, dispatch] = useReducer(TodosReducer, []);
  // - Todos State
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [dialogTodo, setDialogTodo] = useState({ title: "", details: "" });
  const [openDelete, setOpenDelete] = useState(false); // Delete
  const [titleInput, setTitleInput] = useState("");

  // Memoized array of completed tasks
  const completedTasks = useMemo(() => {
    return todos.filter((task) => task.isCompleted);
  }, [todos]);

  // Memoized array of not completed tasks
  const notCompletedTasks = useMemo(() => {
    return todos.filter((task) => !task.isCompleted);
  }, [todos]);

  // Determine which todos to render based on displayedTodosType
  let todosToBeRender = todos;
  if (displayedTodosType === "completed") {
    todosToBeRender = completedTasks;
  } else if (displayedTodosType === "notCompleted") {
    todosToBeRender = notCompletedTasks;
  }

  // Handle displayed todos type change
  const changeDisplayedType = (e) => {
    setDisplayedTodosType(e.target.value);
  };

  // Load todos from localStorage on component mount
  useEffect(() => {
    dispatch({ type: "init" });
  }, []);

  // Add new todo
  const handleAddClick = () => {
    dispatch({ type: "added", payload: { title: titleInput } });
    setTitleInput("");
    showHideToast("تمت الاضافة بنجاح");
  };

  // Handle new todo title input change
  const setTodoTitle = (e) => {
    setTitleInput(e.target.value);
  };

  // Close delete dialog
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  // Show delete dialog for a specific todo
  const showDeleteDialog = (todo) => {
    setDialogTodo(todo || dialogTodo);
    setOpenDelete(true);
  };

  // Confirm delete action
  const handleDeleteConfirm = () => {
    dispatch({ type: "delete", payload: dialogTodo });
    handleDeleteClose();
    showHideToast("تم الحذف بنجاح");
  };

  // State for updating tasks
  const [newTaskValues, setNewTaskValues] = useState(dialogTodo);
  const [openUpdate, setOpenUpdate] = useState(false);

  // Close update dialog
  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  // Confirm update action
  const handleUpdateConfirm = () => {
    dispatch({ type: "update", payload: newTaskValues });
    handleUpdateClose();
    showHideToast("تم التحديث بنجاح");
  };

  // Show update dialog for a specific todo
  const showUpdate = (todo) => {
    setDialogTodo(todo);
    setNewTaskValues(todo);
    setOpenUpdate(true);
  };

  // Handle updated task values input change
  const taskUpdatedValue = (e) => {
    setNewTaskValues({ ...newTaskValues, [e.target.name]: e.target.value });
  };

  // Generate JSX for todos
  const todosJsx = todosToBeRender.map((task) => (
    <Todo
      key={task.id}
      todo={task}
      showDelete={showDeleteDialog}
      showUpdate={showUpdate}
    />
  ));

  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        dir="rtl"
        onClose={handleDeleteClose}
        open={openDelete}
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

      {/* Update Dialog */}
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

      <Container maxWidth="sm" sx={{ height: "100vh", marginTop: "10%" }}>
        <Card sx={{ minWidth: 275, maxHeight: "80vh", overflowY: "scroll" }}>
          <CardContent>
            <Typography variant="h2" sx={{ fontWeight: "500" }}>
              مهامي
            </Typography>
            <Divider />
            <ToggleButtonGroup
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
              dir="ltr"
              color="secondary"
              sx={{ marginTop: "30px" }}
            >
              <ToggleButton value="notCompleted">غير منجز</ToggleButton>
              <ToggleButton value="completed">منجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>

            {todosJsx}

            <Grid container style={{ marginTop: "20px" }} spacing={2}>
              <Grid
                xs={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  value={titleInput}
                  onChange={setTodoTitle}
                />
              </Grid>
              <Grid
                xs={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  sx={{ width: "100%", height: "100%" }}
                  onClick={handleAddClick}
                  disabled={!titleInput.trim().length}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
