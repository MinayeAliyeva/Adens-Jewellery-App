// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from '../../shared/helpers/localStorageUtil';
import { getUserFromToken } from '../../shared/helpers/authStorage';

// State interfeysini yaradırıq
interface User {
    isAdmin: boolean;
    _id: string;
    phone?: string;
    name: string;
    email: string;
  }

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// İlk vəziyyəti təyin edirik
const initialState: AuthState = {
  user: loadFromLocalStorage<User>('user'),
  isAuthenticated: !!loadFromLocalStorage('user'),
};

// Slice yaradırıq
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      saveToLocalStorage('user', action.payload);
    },
    setLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeFromLocalStorage('user');
    },
    setRegister: (state) => {
        console.log("setRegister");
        
      const decodedUser = getUserFromToken();
      // Yeni istifadəçi məlumatlarını `state`-ə və `localStorage`-ə əlavə edirik
      state.user = decodedUser;
      state.isAuthenticated = !!decodedUser?._id;
     // saveToLocalStorage('user', action.payload);
    },
    // LocalStorage-dən oxuyub state-i yenidən yükləyən bir action
    setReloadUserFromStorage: (state) => {
      const user = loadFromLocalStorage<User>('user');
      if (user) {
        state.user = user;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    }
  },
});

// Eksporu
export const { setLogin, setLogout, setRegister, setReloadUserFromStorage } = authSlice.actions;
