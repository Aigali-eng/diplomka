import { auth, db, onAuthStateChanged } from "/static/firebase.js";
import {
  doc, getDoc, updateDoc, arrayUnion
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Получаем ID проекта из URL
const projectId = new URLSearchParams(window.location.search).get("id");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Если пользователь не авторизован — перенаправим на логин
    window.location.href = "/login";
    return;
  }

  try {
    const projectRef = doc(db, "projects", projectId);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
      alert("Проект не найден.");
      return;
    }

    const data = projectSnap.data();
    const members = data.members || [];

    if (!members.includes(user.email)) {
      await updateDoc(projectRef, {
        members: arrayUnion(user.email)
      });
    }

    // Перенаправляем на проект
    window.location.href = `/project.html?id=${projectId}`;
  } catch (err) {
    alert("Ошибка при присоединении к проекту: " + err.message);
  }
});
