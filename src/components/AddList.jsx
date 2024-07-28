import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { TodosList } from "../contexts/Todos";
import { v4 as uuidv4 } from "uuid";

import Grid from "@mui/material/Unstable_Grid2";

// Buttons
import Button from "@mui/material/Button";

// Inputs
import TextField from "@mui/material/TextField";
function AddList() {
  const { todos, setTodos } = useContext(TodosList);

  const [titleInput, setTitleInput] = useState("");
  // ADD to todos
  const handleAddClick = () => {
    const checkTodos = todos.filter((t) =>
      t.title === titleInput ? true : false
    );
    if (titleInput.trim() && !checkTodos.length) {
      const newTodo = {
        id: uuidv4(),
        title: titleInput,
        details: "",
        isCompleted: false,
      };
      setTodos((prev) => {
        const updateTodos = [...prev, newTodo];
        localStorage.setItem("tasks", JSON.stringify(updateTodos));
        return updateTodos;
      });
      setTitleInput("");
    }
  };
  // Add Todo title
  const setTodoTitle = (e) => {
    setTitleInput(e.target.value);
  };

  return (
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
          disabled={titleInput.trim().length? false:true}
        >
          إضافة
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddList;
