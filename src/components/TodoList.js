import { useState } from "react";
import { TodoListItem } from "./TodoListItem";

export const TodoList = () => {
  const defaultListItems = [
    { name: 'Tarefa 1', isCompleted: false },
    { name: 'Tarefa 2', isCompleted: false },
    { name: 'Tarefa 3', isCompleted: false },
    { name: 'Tarefa 4', isCompleted: false }
  ];

  const [items, setItems] = useState(defaultListItems);
  const [taskValue, setTaskValue] = useState('');

  const handleTaskSubmit = (event) => {
    if (items.find(i => i.name === taskValue)) {
      event.preventDefault();
      return;  
    }

    setItems([...items, { name: taskValue, isCompleted: false }]);
    setTaskValue('');

    event.preventDefault();
  }

  const handleOnTaskChanged = (event, item) => {
    setItems(items.map(i => {
      if (i.name === item.name) {
        return {...i, isCompleted: event.target.checked}
      }

      return i;
    }))
  }
  
  return (
    <div className="todo-list-container">
      <form onSubmit={handleTaskSubmit}>
        <input
          placeholder="Digite aqui a nova tarefa"
          type="text"
          value={taskValue}
          onChange={(event) => setTaskValue(event.target.value)}
        />
        <button type="submit">Adicionar tarefa</button>
      </form>
      <ul>
        {items.map(item => (
          <TodoListItem onTaskChanged={handleOnTaskChanged} item={item} />
        ))}
      </ul>
    </div>
  )

}
