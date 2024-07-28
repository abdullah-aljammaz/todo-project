import "./App.css";
import List from "./components/List";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosList } from "./contexts/Todos";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
  typography: {
    fontFamily: ["Cario"],
  },
  palette: {
    primary: {
      main: "#00695c",
    },
    secondary: {
      main: "#093170",
    },
  },
});

const initialTodos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "تفاصيل الكتاب ",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "لعب",
    details: "تفاصيل اللعب ",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "ركض",
    details: "تفاصيل الركض",
    isCompleted: false,
  },
];
function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TodosList.Provider value={{ todos, setTodos }}>
          <List />
        </TodosList.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
