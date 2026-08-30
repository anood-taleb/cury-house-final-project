// ================================
// CURRY HOUSE - script.js
// Handles the Admin page CRUD (Add, Display, Update, Delete)
// All data is saved in the browser's LocalStorage under the key "curryDishes"
// ================================

// Run this as soon as the page loads. If we're on the admin page
// (the table exists), draw whatever dishes are already saved.
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("dishTableBody")) {
    renderDishes();
  }
});

// ---------- READ: get the saved list from LocalStorage ----------
function getDishes() {
  const data = localStorage.getItem("curryDishes");
  // If nothing saved yet, return an empty list instead of null
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}


function setDishes(dishes) {
  localStorage.setItem("curryDishes", JSON.stringify(dishes));
}


function saveDish() {
  const name = document.getElementById("dishName").value.trim();
  const price = document.getElementById("dishPrice").value.trim();
  const category = document.getElementById("dishCategory").value;
  const editIndex = document.getElementById("editIndex").value;

  
  if (name === "" || price === "") {
    alert("Please fill in both the dish name and price.");
    return;
  }

  const dishes = getDishes();
  const newDish = { name: name, price: price, category: category };

  if (editIndex === "") {
  
    dishes.push(newDish);
  } else {
    
    dishes[editIndex] = newDish;
  }

  setDishes(dishes);
  renderDishes();
  resetForm();
}

function renderDishes() {
  const dishes = getDishes();
  const tableBody = document.getElementById("dishTableBody");

  tableBody.innerHTML = "";

  if (dishes.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4" class="text-center py-4">No dishes added yet.</td></tr>';
    return;
  }

  dishes.forEach(function (dish, index) {
    const row = document.createElement("tr");
    row.innerHTML =
      "<td>" + dish.name + "</td>" +
      "<td>$" + dish.price + "</td>" +
      "<td>" + dish.category + "</td>" +
      "<td>" +
      '<button class="btn btn-sm btn-edit" onclick="editDish(' + index + ')">Edit</button>' +
      '<button class="btn btn-sm btn-delete" onclick="deleteDish(' + index + ')">Delete</button>' +
      "</td>";
    tableBody.appendChild(row);
  });
}

function editDish(index) {
  const dishes = getDishes();
  const dish = dishes[index];

  document.getElementById("dishName").value = dish.name;
  document.getElementById("dishPrice").value = dish.price;
  document.getElementById("dishCategory").value = dish.category;
  document.getElementById("editIndex").value = index;
  document.getElementById("saveBtn").textContent = "Update Dish";
}

function deleteDish(index) {
  const confirmDelete = confirm("Are you sure you want to delete this dish?");
  if (!confirmDelete) return;

  const dishes = getDishes();
  dishes.splice(index, 1); 
  setDishes(dishes);
  renderDishes();
}


function resetForm() {
  document.getElementById("dishName").value = "";
  document.getElementById("dishPrice").value = "";
  document.getElementById("dishCategory").value = "Starter";
  document.getElementById("editIndex").value = "";
  document.getElementById("saveBtn").textContent = "Add Dish";
}