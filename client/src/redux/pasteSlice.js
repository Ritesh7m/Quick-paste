import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000/api/pastes";

export const fetchPastes = createAsyncThunk("paste/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addToPastes = createAsyncThunk("paste/add", async (paste) => {
  const res = await axios.post(API_URL, paste);
  toast.success("Paste Created");
  return res.data;
});

export const updateToPastes = createAsyncThunk("paste/update", async (paste) => {
  const res = await axios.put(`${API_URL}/${paste._id}`, paste);
  toast.success("Paste Updated");
  return res.data;
});

export const removeFromPastes = createAsyncThunk("paste/remove", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  toast.success("Paste Removed");
  return id;
});

const pasteSlice = createSlice({
  name: "paste",
  initialState: { pastes: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPastes.fulfilled, (state, action) => {
        state.pastes = action.payload;
      })
      .addCase(addToPastes.fulfilled, (state, action) => {
        state.pastes.unshift(action.payload);
      })
      .addCase(updateToPastes.fulfilled, (state, action) => {
        const index = state.pastes.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.pastes[index] = action.payload;
      })
      .addCase(removeFromPastes.fulfilled, (state, action) => {
        state.pastes = state.pastes.filter((p) => p._id !== action.payload);
      });
  },
});

export default pasteSlice.reducer;
