import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer, columnsReducer, cardsReducer } from "./ducks";

const rootReducer = combineReducers({
  user: userReducer,
  columns: columnsReducer,
  cards: cardsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false, }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
