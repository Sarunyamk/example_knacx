import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const localProducts = JSON.parse(localStorage.getItem("products")) || [];
    const response = await axios.get("https://fakestoreapi.com/products");
    const maxLocalId = localProducts.length > 0
        ? Math.max(...localProducts.map((item) => Number(item.id)))
        : 0;

    const apiProducts = response.data.map((item, index) => ({
        id: maxLocalId + index + 1, // ป้องกัน id ซ้ำ
        title: item.title,
        price: item.price,
        image: item.image,
    }));

    localStorage.setItem("products", JSON.stringify([...localProducts, ...apiProducts]));
    return apiProducts;
});


const initialState = {
    items: JSON.parse(localStorage.getItem("products")) || [],
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
            const maxId = existingProducts.length > 0
                ? Math.max(...existingProducts.map((item) => Number(item.id)))
                : 0;
            const newProduct = { ...action.payload, id: maxId + 1 }; // กำหนด id ใหม่
            const updatedProducts = [...existingProducts, newProduct];
            state.items = updatedProducts;
            localStorage.setItem("products", JSON.stringify(updatedProducts));
        },
        editProduct: (state, action) => {
            const { id, title, price, image } = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            if (index !== -1) {
                state.items[index] = { id, title, price, image };
            }
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
                const localProducts = JSON.parse(localStorage.getItem("products")) || [];
                const newProducts = action.payload.filter(
                    (apiItem) => !localProducts.some((localItem) => localItem.id === apiItem.id)
                );
                const combinedProducts = [...localProducts, ...newProducts];
                state.items = combinedProducts;
                localStorage.setItem("products", JSON.stringify(combinedProducts));
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addProduct, deleteProduct, editProduct } = productsSlice.actions;
export default productsSlice.reducer;
