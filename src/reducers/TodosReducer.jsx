import { v4 as uuidv4 } from "uuid";

export default function TodosReducer(currentTodos, action) {
  switch (action.type) {
    case "init": {
      const storageTasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
      return storageTasks;
    }
    case "added": {
      const checkTodos = currentTodos.filter(
        (t) => t.title === action.payload.title
      );
      if (!action.payload.title.trim() || checkTodos.length) {
        return currentTodos;
      }
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        details: "",
        isCompleted: false,
      };

      const updateTodos = [...currentTodos, newTodo];
      localStorage.setItem("tasks", JSON.stringify(updateTodos));
      return updateTodos;
    }
    case "delete": {
      const deleteTodoById = currentTodos.filter(
        (t) => action.payload.id !== t.id
      );
      localStorage.setItem("tasks", JSON.stringify(deleteTodoById));
      return deleteTodoById;
    }
    case "update": {
      if (action.payload.title.trim() || action.payload.details.trim()) {
        const updateTodos = currentTodos.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
        localStorage.setItem("tasks", JSON.stringify(updateTodos));
        return updateTodos;
      }
    }
    // eslint-disable-next-line no-fallthrough
    default: {
      throw Error("Unkonw Action " + action.type);
    }
  }
}
