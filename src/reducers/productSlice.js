import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const localProducts = JSON.parse(localStorage.getItem("products")) || [];
    if (localProducts.length > 0) {
        return localProducts;
    }

    const response = await axios.get("https://fakestoreapi.com/products");
    const apiProducts = response.data.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
    }));

    localStorage.setItem("products", JSON.stringify(apiProducts));
    return apiProducts;
});



const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        addProduct: (state, action) => {
            const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
            state.items = [action.payload, ...existingProducts];
            localStorage.setItem("products", JSON.stringify(state.items));
        },
        deleteProduct: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            localStorage.setItem("products", JSON.stringify(state.items));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
