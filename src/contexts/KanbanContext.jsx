import { createContext, useReducer } from "react";
import { kanbanReducer, initialState } from "./kanbanReducer";

export const KanbanContext = createContext();

export const KanbanProvider = ({ children }) => {
    const [state, dispatch] = useReducer(kanbanReducer, initialState);
    return (
        <KanbanContext.Provider value={{ state, dispatch }}>
            {children}
        </KanbanContext.Provider>
    )
}