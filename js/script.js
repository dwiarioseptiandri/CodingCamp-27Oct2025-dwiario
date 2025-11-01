const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");
const deleteAllBtn = document.getElementById("deleteAllBtn");

let tasks = [];

addBtn.addEventListener("click", addTask);
filter.addEventListener("change", renderTasks);
deleteAllBtn.addEventListener("click", confirmDeleteAll);

function addTask() {
  const text = taskInput.value.trim();
  const date = dateInput.value;

  if (!text) {
    alert("Silakan isi nama tugas sebelum menambahkan");
    return;
  }

  tasks.push({ text, date, done: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTasks();
}

function confirmDeleteAll() {
  if (tasks.length === 0) {
    alert("Tidak ada tugas yang perlu dihapus");
    return;
  }

  const confirmDelete = confirm("Apakah Anda yakin ingin menghapus semua tugas?");
  if (confirmDelete) {
    tasks = [];
    renderTasks();
  }
}

function renderTasks() {
  const filterValue = filter.value;
  const filtered = tasks.filter(t =>
    filterValue === "done" ? t.done :
    filterValue === "pending" ? !t.done :
    true
  );

  taskList.innerHTML = "";

  if (filtered.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
    return;
  }

  filtered.forEach((task, index) => {
    const row = document.createElement("tr");
    row.style.opacity = "0";
    setTimeout(() => (row.style.opacity = "1"), 50);

    const statusIcon = task.done
      ? `<span class="status-icon" style="color: #4caf50;">✅</span>`
      : `<span class="status-icon" style="color: #f1c40f;">🕒</span>`;

    row.innerHTML = `
      <td class="${task.done ? "done" : ""}">${task.text}</td>
      <td>${task.date || "-"}</td>
      <td>${statusIcon}</td>
      <td>
        <button class="action-btn complete-btn" onclick="toggleDone(${index})">Complete</button>
        <button class="action-btn delete-btn" onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
    taskList.appendChild(row);
  });
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

renderTasks();
