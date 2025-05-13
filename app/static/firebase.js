// static/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCQnCbrt5tTPWUy-28JgpO_mdwLrBfe5zo",
  authDomain: "diplom-proj22.firebaseapp.com",
  projectId: "diplom-proj22",
  storageBucket: "diplom-proj22.firebasestorage.app",
  messagingSenderId: "812764485262",
  appId: "1:812764485262:web:4c119f3b271a568eab9bdf",
  measurementId: "G-BKDMP13XQ5"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Firestore для проектов

// Email-проверка
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// LOGIN
window.login = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (!isValidEmail(email)) {
    error.textContent = "Неверный формат email.";
    return;
  }

  if (password.length < 6) {
    error.textContent = "Пароль должен быть не менее 6 символов.";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "/";
    })
    .catch((err) => {
      if (err.code === 'auth/user-not-found') {
        error.textContent = "Аккаунт с таким email не найден.";
      } else if (err.code === 'auth/wrong-password') {
        error.textContent = "Неверный пароль.";
      } else {
        error.textContent = "Ошибка входа: " + err.message;
      }
    });
};

// REGISTER
window.register = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (!isValidEmail(email)) {
    error.textContent = "Неверный формат email.";
    return;
  }

  if (password.length < 6) {
    error.textContent = "Пароль должен быть не менее 6 символов.";
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "/";
    })
    .catch((err) => {
      if (err.code === 'auth/email-already-in-use') {
        error.textContent = "Аккаунт с таким email уже существует.";
      } else {
        error.textContent = "Ошибка регистрации: " + err.message;
      }
    });
};

// Обновление навигации при входе
window.setupAuthState = function () {
  const nav = document.getElementById("nav-links");
  onAuthStateChanged(auth, (user) => {
    if (user && nav) {
      nav.innerHTML = `
        <span class="text-gray-600">Вы вошли как: <strong>${user.email}</strong></span>
        <button onclick="logout()" class="text-red-600 hover:underline ml-4">Выйти</button>
      `;
    }
  });
};

// Выход
window.logout = function () {
  signOut(auth).then(() => {
    window.location.reload();
  });
};

// Кнопка "Начать"
window.startApp = function () {
  const user = auth.currentUser;
  if (user) {
    window.location.href = "/dashboard";
  } else {
    window.location.href = "/login";
  }
};

// Экспорт для других модулей (dashboard и т.п.)
export { app, auth, db, onAuthStateChanged };
