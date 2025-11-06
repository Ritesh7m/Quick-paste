import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Use environment variable from Vite
const API_BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;
const APIURL = `${API_BASE_URL}/pastes`;

// Fetch all pastes
export const fetchPastes = createAsyncThunk("paste/fetch", async () => {
  const res = await axios.get(APIURL);
  return res.data;
});

// Fetch paste by slug
export const fetchPasteBySlug = createAsyncThunk("paste/fetchBySlug", async (slug) => {
  const res = await axios.get(`${APIURL}/slug/${slug}`);
  return res.data;
});

// Fetch paste by ID
export const fetchPasteById = createAsyncThunk("paste/fetchById", async (id) => {
  const res = await axios.get(`${APIURL}/${id}`);
  return res.data;
});

// Add new paste
export const addToPastes = createAsyncThunk("paste/add", async (paste) => {
  const res = await axios.post(APIURL, paste);
  toast.success("Paste Created");
  return res.data;
});

// Update existing paste
export const updateToPastes = createAsyncThunk("paste/update", async (paste) => {
  const res = await axios.put(`${APIURL}/${paste._id}`, paste);
  toast.success("Paste Updated");
  return res.data;
});

// Remove paste
export const removeFromPastes = createAsyncThunk("paste/remove", async (id) => {
  await axios.delete(`${APIURL}/${id}`);
  toast.success("Paste Removed");
  return id;
});

const pasteSlice = createSlice({
  name: "paste",
  initialState: { pastes: [], currentPaste: null, loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPastes.fulfilled, (state, action) => {
        state.pastes = action.payload;
      })
      .addCase(fetchPasteBySlug.fulfilled, (state, action) => {
        state.currentPaste = action.payload;
      })
      .addCase(fetchPasteById.fulfilled, (state, action) => {
        state.currentPaste = action.payload;
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
