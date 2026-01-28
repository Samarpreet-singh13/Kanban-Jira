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
                ...state,
                columns: { ...state.columns },
                todo: [...state.columns.todo, action.payload]
            };
    }
}