import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Menggunakan localStorage
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";

// Konfigurasi Redux Persist untuk setiap slice
const authPersistConfig = {
  key: "auth",
  storage,
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

// Kombinasikan reducer dengan persistReducer
const rootReducer = {
  auth: persistReducer(authPersistConfig, authReducer), 
  cart: persistReducer(cartPersistConfig, cartReducer),
  products: productReducer,            
  users: userReducer,            
  orders: orderReducer,            
};

// Konfigurasi store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Abaikan aksi Redux Persist
      },
    }),
});

const persistor = persistStore(store); // Untuk persist gate

export { store, persistor };
