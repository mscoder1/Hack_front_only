import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SnackbarType = {
  type: "error" | "info" | "success";
  text: string;
};

export interface Poap {
  title: string;
  description: string;
  timestamp: number;
  latitude: string;
  longitude: string;
  imgLink: string;
  img?: string;
}

interface AppState {
  firstName: string;
  lastName: string;
  avatar: string;
  poaps: Poap[];
  collections: string[];
  snackbar: null | SnackbarType;
  loading: boolean;
}

const initialState: AppState = {
  firstName: "",
  lastName: "",
  avatar: "",
  poaps: [],
  collections: [],
  snackbar: null,
  loading: false,
};

const AppReducer = createSlice({
  name: "App",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        avatar: string;
      }>
    ) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.avatar = action.payload.avatar;
    },
    setPoaps: (state, action: PayloadAction<Poap[]>) => {
      state.poaps = action.payload;
    },
    setCollections: (state, action: PayloadAction<string[]>) => {
      state.collections = action.payload;
    },
    setSnackbar(state, action: PayloadAction<SnackbarType | null>) {
      state.snackbar = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export default AppReducer.reducer;
export const {
  setUserData,
  setPoaps,
  setCollections,
  setSnackbar,
  setLoading,
} = AppReducer.actions;
