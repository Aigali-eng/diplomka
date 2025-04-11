// Инициализация Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCQnCbrt5tTPWUy-28JgpO_mdwLrBfe5zo",
  authDomain: "diplom-proj22.firebaseapp.com",
  projectId: "diplom-proj22",
  storageBucket: "diplom-proj22.appspot.com",
  messagingSenderId: "812764485262",
  appId: "1:812764485262:web:4c119f3b271a568eab9bdf",
  measurementId: "G-BKDMP13XQ5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.register = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Успешная регистрация!");
    window.location.href = "/";
  } catch (error) {
    document.getElementById("error").innerText = error.message;
  }
};

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Вход выполнен!");
    window.location.href = "/";
  } catch (error) {
    document.getElementById("error").innerText = error.message;
  }
};
