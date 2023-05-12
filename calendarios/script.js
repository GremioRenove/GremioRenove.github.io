const dataCContainer = document.getElementById("calendarContainer");
let year = 2023;

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

function generateCalendarHTML(month, year, holidays) {
  // Create a new Date object for the first day of the month
  let firstDay = new Date(year, month, 1);

  // Get the day of the week for the first day of the month (0 = Sunday, 6 = Saturday)
  let firstDayOfWeek = firstDay.getDay();

  // Get the number of days in the month
  let daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create an HTML table for the calendar
  let calendarHTML = `<h1 class="monthName" id="${monthNames[month]}">${monthNames[month]} ${year}</h1>`;

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
    let date = new Date(year, month, day);
    let dayOfWeek = date.getDay();
    if ((day + firstDayOfWeek - 1) % 7 === 0) {
      calendarHTML += "</tr><tr>";
    }
    if (holidays.includes(day)) {
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        calendarHTML += `<td class="holiday noFaculty" data-day="${day}">${day}</td>`;
      } else {
        calendarHTML += `<td class="holiday" data-day="${day}">${day}</td>`;
      }
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
// Create a nested JSON object with holiday descriptions
let holidayDescriptions = {
  1: {
    // January
    1: "Ano Novo",
  },
  2: {
    // February
    20: "Segunda-feira de Carnaval",
    21: "Carnaval",
    22: "Quarta-feira de Cinzas(Ponto facultativo)",
  },
  3: {
    // March
    8: "Dia internacional da Mulher",
    23: "Outono",
  },
  4: {
    // April
    2: "Domingo de Ramos",
    7: "Sexta-feira Santa",
    8: "Sábado Aleluia",
    9: "Páscoa",
    19: "Dia do Índio",
    21: "Tiradentes",
    22: "Descobrimento do Brasil",
  },
  5: {
    // May
    1: "Dia do Trabalho",
    14: "Dia das Mães",
  },
  6: {
    // June
    8: "Corpus Christi",
    12: "Dia dos Namorados",
    21: "Solstício de Inverno",
    24: "Dia de São João",
  },
  7: {
    // July
    9: "Dia da Revolução Constitucionalista",
    20: "Dia do Amigo e Internacional da Amizade",
  },
  8: {
    // August
    13: "Dia dos Pais",
    22: "Dia do Folclore",
    25: "Dia do Soldado",
  },
  9: {
    // September
    7: "Dia da Independência do Brasil",
    21: "Dia da Árvore",
    23: "Início da Primavera",
  },
  10: {
    // October
    12: "Dia das Crianças/Nossa Senhora Aparecida",
    15: "Dia do Professor",
    28: "Dia do Servidor Público",
    31: "Dia das Bruxas - Halloween / Dia do Saci",
  },
  11: {
    // November
    1: "Dia de Todos os Santos",
    2: "Finados",
    15: "Proclamação da República",
    19: "Dia da Bandeira",
    20: "Dia Nacional da Consciência Negra",
  },
  11: {
    // December
    22: "Início do Verão - Solstício de Verão",
    24: "Véspera de Natal",
    25: "Natal",
    31: "Véspera de Ano-Novo",
  },
  // ...
};

// Generate calendars for each month of the year
for (let month = 0; month < 12; month++) {
  let holidays = Object.keys(holidayDescriptions[month + 1] || {}).map(Number);
  let calendarHTML = generateCalendarHTML(month, year, holidays);
  dataCContainer.innerHTML += calendarHTML;
}

// Create a description card element
let descriptionCard = document.createElement("div");
descriptionCard.classList.add("description-card");
document.body.appendChild(descriptionCard);

// Add an event listener to holiday cells
dataCContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("holiday")) {
    let month = event.target
      .closest("table")
      .previousElementSibling.textContent.split(" ")[0];
    let day = event.target.dataset.day;
    let monthIndex = monthNames.indexOf(month) + 1;
    let description = holidayDescriptions[monthIndex][day];
    descriptionCard.innerHTML = description;
    descriptionCard.style.display = "block";
    let rect = event.target.getBoundingClientRect();
    descriptionCard.style.left = `${event.pageX}px`;
    descriptionCard.style.top = `${event.pageY}px`;
  } else {
    descriptionCard.style.display = "none";
  }
});

let anchorsContainer = document.createElement("div");
dataCContainer.parentNode.insertBefore(anchorsContainer, dataCContainer);

let anchorsList = document.createElement("ul");
anchorsList.classList.add("anchorsList");
anchorsContainer.appendChild(anchorsList);

for (let month = 0; month < 12; month++) {
  let anchor = document.createElement("a");
  anchor.href = `#${monthNames[month]}`;
  anchor.innerHTML = `${monthNames[month]} <span class="flow"></span>`;

  let listItem = document.createElement("li");
  listItem.appendChild(anchor);
  anchorsList.appendChild(listItem);
}
