const dataCContainer = document.getElementById("calendarContainer");
let year = 2023;

function generateCalendarHTML(month, year, holidays) {
  // Create a new Date object for the first day of the month
  let firstDay = new Date(year, month, 1);

  // Get the day of the week for the first day of the month (0 = Sunday, 6 = Saturday)
  let firstDayOfWeek = firstDay.getDay();

  // Get the number of days in the month
  let daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create an array of month names
  let monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Create an HTML table for the calendar
  let calendarHTML = `<h1 class="monthName">${monthNames[month]} ${year}</h1>`;

  // Create an HTML table for the calendar
  calendarHTML += "<table>";
  calendarHTML +=
    "<tr><th>Dom</th><th>Seg</th><th>Ter</th><th>Qua</th><th>Qui</th><th>Sex</th><th>Sáb</th></tr>";

  // Add empty cells for days before the first day of the month
  calendarHTML += "<tr>";
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarHTML += "<td></td>";
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    if ((day + firstDayOfWeek - 1) % 7 === 0) {
      calendarHTML += "</tr><tr>";
    }
    if (holidays.includes(day)) {
      calendarHTML += `<td class="holiday">${day}</td>`;
    } else {
      calendarHTML += `<td>${day}</td>`;
    }
  }

  // Add empty cells for days after the last day of the month
  for (let i = (daysInMonth + firstDayOfWeek) % 7; i < 7 && i > 0; i++) {
    calendarHTML += "<td></td>";
  }

  calendarHTML += "</tr></table>";

  return calendarHTML;
}

// Generate calendars for each month of the year
for (let month = 0; month < 12; month++) {
  // Set holidays for each month (replace with actual holiday dates)
  let holidays;
  switch (month) {
    case 0: // January
      holidays = [1];
      break;
    case 1: // February
      holidays = [20, 21, 22];
      break;
    case 2: // March
      holidays = [8, 20];
      break;
    case 3: // April
      holidays = [2, 6, 7, 8, 9, 19, 21, 22];
      break;
    case 4: // May
      holidays = [1, 14];
      break;
    case 5: // June
      holidays = [8, 12, 21, 24];
      break;
    case 6: // July
      holidays = [9, 20];
      break;
    case 7: // August
      holidays = [13, 22, 25];
      break;
    case 8: // September
      holidays = [7, 21, 23];
      break;
    case 9: // October
      holidays = [12, 14, 15, 28, 31];
      break;
    case 10: // November
      holidays = [1, 2, 15, 19, 20];
      break;
    case 11: // December
      holidays = [22, 24, 25, 31];
      break;
    default:
      holidays = [];
  }

  let calendarHTML = generateCalendarHTML(month, year, holidays);
  dataCContainer.innerHTML += calendarHTML;
}
