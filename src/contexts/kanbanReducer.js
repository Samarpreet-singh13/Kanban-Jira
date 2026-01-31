export const initialState = {
     columns: {
        todo: [{ id: "1", title: "Setup project", description: "Initialize Vite + React" }],
        inProgress: [{id:"2", title:"Discussing needs "}],
        done: []
    }
}

export const kanbanReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return {
                // ...state means we are copying the existing state
                ...state,
                columns: {
                     ...state.columns ,
                    todo: [...state.columns.todo, action.payload]
            }    
        };
        case "DELETE_TASK":
            return {
                // ...state se purani state copy kar raha hai
                ...state,
                columns:{
                    ...state.columns,
                    [action.payload.column]: 
                    state.columns[action.payload.column]
                    .filter((task) => task.id !== action.payload.id),
            },
        };
        case "EDIT_TASK":
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [action.payload.column]: state.columns[action.payload.column]
                    .map(task => 
                        task.id === action.payload.id ? {
                            ...task,
                            title: action.payload.title,
                            description: action.payload.description,
                        }
                        : task
                    )
                }
            }
        default:return state 
    }
}