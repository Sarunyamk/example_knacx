import { configureStore } from '@reduxjs/toolkit'

import userSlice from './userSlice'
import productsSlice from './productSlice'

const store = configureStore({
    reducer: {
        userStore: userSlice,
        productStore: productsSlice
    }

})

export default store