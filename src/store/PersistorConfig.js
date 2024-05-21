import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import QuizStore from './QuizStore';
import QuizAreaStore  from './QuizAreaStore';




const persistConfig = {
    key: 'root', // Root key for your state in local storage
    storage, // Storage engine (localStorage)
};

// Wrap the reducers with persistReducer
const persistedQuizStoreReducer = persistReducer(persistConfig, QuizAreaStore);
const persistedQuizAreaStoreReducer = persistReducer(persistConfig, QuizStore);


const store = configureStore({
    reducer: {
        quizStore: persistedQuizStoreReducer,
        quizAreaStore: persistedQuizAreaStoreReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});


// Create the persistor instance using the store
const persistor = persistStore(store);

// Export the store and persistor for use in your application
export { store, persistor };
export default store;