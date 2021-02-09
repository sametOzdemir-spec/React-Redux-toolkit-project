import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    addItem: (state, action) => {
      if (
        state.items.filter((item) => item.movie === action.payload.movie)
          .length > 0
      ) {
        state.items = state.items.map((item, index) => {
          if( item.movie === action.payload.movie ) {
            return (action.payload)
          } else {
            return (item)
          }
        })
      } else {
        state.items.push(action.payload);
      }
    },
    fetchItems: (state) => {
      state.items = [];
      state.loading = true;
    },
    saveItems: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
  },
});

export const { addItem, fetchItems, saveItems } = movieSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const addItemAction = (item) => (dispatch) => {
  dispatch(addItem(item));
};

export const fetchItemsAction = () => (dispatch) => {
  dispatch(fetchItems());
  // Mock API call
  setTimeout(() => {
    const items = [
      {
        movie: "Frozen",
        rating: "4.9",
        duration: "1h",
      },
      {
        movie: "Bolt",
        rating: "3.5",
        duration: "2h",
      },
    ];
    dispatch(saveItems(items));
  }, 2000);
};

export const movieSelector = (state) => state.movies.items;
export const loadingSelector = (state) => state.movies.loading;

export default movieSlice.reducer;
