import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const generateTableRows = () => {
      const complaints: any = JSON.parse(localStorage.getItem('complaints')) || [];
      const tbody = document.querySelector("#complaint-table tbody");
      tbody.innerHTML = "";

      for (let i = 0; i < complaints.length; i++) {
        const row = document.createElement("tr");
        const currentDate = new Date();
        const date = currentDate.toISOString().slice(0, 10);
        const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        row.innerHTML = `
          <td>${i + 1}</td>
          <td class="complaint-cell">${complaints[i]}</td>
          <td>${date}</td>
          <td>${time}</td>
        `;
        tbody.appendChild(row);
      }
    }

    function animateTableRows() {
      const tableRows = document.querySelectorAll("#complaint-table tbody tr");

      tableRows.forEach((row: any, index) => {
        row.style.animationDelay = `${index * 0.3}s`;
        row.classList.add('table-animation');
      });
    }

    function saveComplaint(complaint) {
      let savedComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
      savedComplaints.push(complaint);
      localStorage.setItem('complaints', JSON.stringify(savedComplaints));

      if (savedComplaints.length === 10) {
        alert("You have reached the maximum number of complaints.");
      }
    }

    function getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    function handleFormSubmit(event) {
      event.preventDefault();
      const input: any = document.querySelector("#complaint-input");
      const complaint = input.value.trim();
      if (complaint !== "") {
        saveComplaint(complaint);
        input.value = "";
        generateTableRows();
        animateTableRows();
      }
    }

    generateTableRows();
    animateTableRows();

    document.querySelector("#submit-button").addEventListener("click", handleFormSubmit);

    document.querySelector("#complaint-input").addEventListener("keydown", function(event: any) {
      if (event.keyCode === 13) {
        handleFormSubmit(event);
      }
    });

    function removeComplaintsAtMidnight() {
      const today: any = new Date();
      const midnight: any = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0);
      const timeUntilMidnight = midnight - today;

      setTimeout(function() {
        localStorage.removeItem('complaints');
      }, timeUntilMidnight);
    }
  }

}
