import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"

const APIURL = "http://localhost:5000/api/pastes"

export const fetchPastes = createAsyncThunk("paste/fetch", async () => {
  const res = await axios.get(APIURL)
  return res.data
})

export const fetchPasteBySlug = createAsyncThunk("paste/fetchBySlug", async (slug) => {
  const res = await axios.get(`${APIURL}/slug/${slug}`)
  return res.data
})

export const fetchPasteById = createAsyncThunk("paste/fetchById", async (id) => {
  const res = await axios.get(`${APIURL}/${id}`)
  return res.data
})

export const addToPastes = createAsyncThunk("paste/add", async (paste) => {
  const res = await axios.post(APIURL, paste)
  toast.success("Paste Created")
  return res.data
})

export const updateToPastes = createAsyncThunk("paste/update", async (paste) => {
  const res = await axios.put(`${APIURL}/${paste._id}`, paste)
  toast.success("Paste Updated")
  return res.data
})

export const removeFromPastes = createAsyncThunk("paste/remove", async (id) => {
  await axios.delete(`${APIURL}/${id}`)
  toast.success("Paste Removed")
  return id
})

const pasteSlice = createSlice({
  name: "paste",
  initialState: { pastes: [], currentPaste: null, loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPastes.fulfilled, (state, action) => {
        state.pastes = action.payload
      })
      .addCase(fetchPasteBySlug.fulfilled, (state, action) => {
        state.currentPaste = action.payload
      })
      .addCase(fetchPasteById.fulfilled, (state, action) => {
        state.currentPaste = action.payload
      })
      .addCase(addToPastes.fulfilled, (state, action) => {
        state.pastes.unshift(action.payload)
      })
      .addCase(updateToPastes.fulfilled, (state, action) => {
        const index = state.pastes.findIndex((p) => p._id === action.payload._id)
        if (index !== -1) state.pastes[index] = action.payload
      })
      .addCase(removeFromPastes.fulfilled, (state, action) => {
        state.pastes = state.pastes.filter((p) => p._id !== action.payload)
      })
  },
})

export default pasteSlice.reducer
