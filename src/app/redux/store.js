// src/lib/redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import { combineReducers } from 'redux'

import slice from './slice'

const rootReducer = combineReducers({
  locations: slice
  // Add other reducers here
})

const persistConfig = {
  key: 'root',
  storage,
  // Optional: add any reducer you don't want to persist here
  // blacklist: ['counter']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
})

export const persistor = persistStore(store)