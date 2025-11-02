import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import axiosClient from "@/utils/axios";



// 🧩 Types
export interface User {
  _id?: string;
  username: string;
  fullName: string;
  emailId: string;
  profileImageUrl?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// Input types for actions
export interface RegisterData {
  userName: string;
  emailId: string;
  password: string;
  role: "actor" | "director";
}

export interface LoginData {
  emailId: string;
  password: string;
  isGoogleAuth?: boolean;
  googleToken?: string;
}

// 🧠 Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
};

// ✅ Register user
export const registerUser = createAsyncThunk<
  User,
  RegisterData,
  { rejectValue: string }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post("/user/signup", userData);
    return response.data.user as User;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

// ✅ Login user
export const loginUser = createAsyncThunk<
  User,
  LoginData,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    if (credentials.isGoogleAuth && credentials.googleToken) {
      const response = await axiosClient.post("/user/google-auth", {
        token: credentials.googleToken,
      });
      return response.data.user as User;
    } else {
      const response = await axiosClient.post("/user/login", credentials);
      return response.data.user as User;
    }
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

// ✅ Authenticate user
export const authenticateUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/check", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosClient.get("/user/check-Auth");
    return response.data.user as User;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

// ✅ Logout user
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosClient.post("/user/logout");
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// 🧩 Slice
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateUserProfile: (
      state,
      action: PayloadAction<{ username: string; fullName: string }>
    ) => {
      if (state.user) {
        state.user.username = action.payload.username;
        state.user.fullName = action.payload.fullName;
      }
    },
    updateUserProfileImage: (
      state,
      action: PayloadAction<{ profileImageUrl: string }>
    ) => {
      if (state.user) {
        state.user.profileImageUrl = action.payload.profileImageUrl;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Authenticate
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { updateUserProfile, updateUserProfileImage } = authSlice.actions;
export default authSlice.reducer;
