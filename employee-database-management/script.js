(async function fetchEmployees() {
  const response = await fetch("data.json");
  const data = await response.json();
  let employeesData = data;

  // selected employee
  let selectedEmployeeId = employeesData[0].id;
  console.log(selectedEmployeeId);
  let selectedEmployee = employeesData[0];

  let employeeNames = document.querySelector(".employees__names--list");
  let employeeInfo = document.querySelector(".employees__single--info");

  // add modal to create an employee
  let createEmployee = document.getElementById("createEmployee");
  let addEmployeeModal = document.getElementById("addEmployee");
  let addEmployeeForm = document.getElementById("addEmployee__create");

  // bring modal in ui
  createEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
  });

  // close modal clicking outside
  addEmployeeModal.addEventListener("click", (e) => {
    if (e.target.id == "addEmployee") {
      addEmployeeModal.style.display = "none";
    }
  });

  // check if employee 18 or not
  const dobInput = document.querySelector(".addEmployee__create--dob");
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
    .toISOString()
    .slice(5, 10)}`;

  // add employee through form
  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(addEmployeeForm);
    let values = [...formData.entries()];
    let singleEmployeeData = {};

    values.forEach((val) => {
      singleEmployeeData[val[0]] = val[1];
    });

    singleEmployeeData.id = employeesData[employeesData.length - 1].id + 1;
    singleEmployeeData.age =
      new Date().getFullYear() -
      parseInt(singleEmployeeData.dob.slice(0, 4), 10);
    singleEmployeeData.imageUrl =
      singleEmployeeData.imageUrl ||
      "https://cdn-icons-png.flaticon.com/512/0/93.png";
    employeesData.push(singleEmployeeData);
    renderEmployeeNames();
    addEmployeeModal.style.display = "none";
  });

  // changing selected employee
  employeeNames.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && e.target.id !== selectedEmployeeId) {
      selectedEmployeeId = e.target.id;
      renderEmployeeNames();
      renderSingleEmployee();
    }

    if (e.target.tagName === "I") {
      employeesData = employeesData.filter(
        (employee) => String(employee.id) !== e.target.parentNode.id
      );

      if (String(selectedEmployeeId) === e.target.parentNode.id) {
        selectedEmployeeId = employeesData[0]?.id || -1;
        selectedEmployee = employeesData[0] || {};
        renderSingleEmployee();
      }
      renderEmployeeNames();
    }
  });

  // render employee names
  function renderEmployeeNames() {
    employeeNames.innerHTML = "";
    employeesData.forEach((employee) => {
      const employeeName = document.createElement("span");
      employeeName.classList.add("employees__names--item");
      employeeName.setAttribute("id", employee.id);
      if (parseInt(selectedEmployeeId) === employee.id) {
        employeeName.classList.add("selected");
        selectedEmployee = employee;
      }
      employeeName.innerHTML = `${employee.firstName} ${employee.lastName}  <i class="employeeDelete">❌</i>`;
      employeeNames.append(employeeName);
    });
  }

  // render single employee
  function renderSingleEmployee() {
    // clear all data
    if (selectedEmployeeId === -1) {
      employeeInfo.innerHTML = "";
      return;
    }
    employeeInfo.innerHTML = `
      <img src="${selectedEmployee.imageUrl}" />
      <span class="employees__single--heading">
      ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
      </span>
      <span>${selectedEmployee.address}</span>
      <span>${selectedEmployee.email}</span>
      <span>Mobile - ${selectedEmployee.contactNumber}</span>
      <span>DOB - ${selectedEmployee.dob}</span>
    `;
  }

  renderEmployeeNames();
  if (selectedEmployee) renderSingleEmployee();
})();
