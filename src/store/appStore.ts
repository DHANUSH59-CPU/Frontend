import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";

// ✅ Create the store
export const appStore = configureStore({
  reducer: {
    authSlice: authSliceReducer,
  },
});

// 🧠 Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

// ✅ Typed hooks (optional but recommended)
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

// Custom typed hooks for usage in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default appStore;
