// React
import * as React from "react";
import { useContext, useEffect, useState } from "react";

// Layouts
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// Buttons & Inputs
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// Components
import Todo from "./Todo";
import AddList from "./AddList";
// Others
import { TodosList } from "../contexts/Todos";

export default function List() {
  // - Todos State
  // eslint-disable-next-line no-unused-vars
  const { todos, setTodos } = useContext(TodosList);

  // - Todos type
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // Fliteration Arrays
  const completedTasks = todos.filter((task) => task.isCompleted);

  const notCompletedTasks = todos.filter((task) => !task.isCompleted);

  let todosToBeRender = todos;
  if (displayedTodosType === "completed") {
    console.log(1);
    todosToBeRender = completedTasks;
  } else if (displayedTodosType === "notCompleted") {
    console.log(2);
    todosToBeRender = notCompletedTasks;
  }

  // - Todos Map
  const todosJsx = todosToBeRender.map((task) => {
    return <Todo key={task.id} todo={task} />;
  });
  // EVENT HANDLER
  const changeDisplayedType = (e) => {
    setDisplayedTodosType(e.target.value);
  };
  // ==== EVENT HANDLER ====

  // Effect
  useEffect(() => {
    const storageTasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
    setTodos(storageTasks);
    console.log("%c1wgt Todo Project", "color:red; font-size:50px");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
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

          {/* All Todos */}
          {todosJsx}
          {/* Adding Components */}
          <AddList />
        </CardContent>
      </Card>
    </Container>
  );
}
