/* ============================================================
   dummy-data.js — Sample Flight Data & Search Handler
   ----------------------------------------------------------
   Contains an array of flight objects representing Egyptian
   domestic routes, and a helper function that fires when
   the user submits the search form on index.html.
   ============================================================ */

// --- Flight data array ---
var flights = [
  {
    id: "NH101",
    from: "Cairo",
    to: "Luxor",
    date: "2026-05-10",
    departure: "08:00",
    arrival: "09:15",
    duration: "1h 15m",
    price: 1850,
    currency: "EGP"
  },
  {
    id: "NH202",
    from: "Cairo",
    to: "Sharm El-Sheikh",
    date: "2026-05-12",
    departure: "10:30",
    arrival: "11:45",
    duration: "1h 15m",
    price: 2200,
    currency: "EGP"
  },
  {
    id: "NH303",
    from: "Alexandria",
    to: "Aswan",
    date: "2026-05-14",
    departure: "06:00",
    arrival: "08:00",
    duration: "2h 00m",
    price: 2500,
    currency: "EGP"
  },
  {
    id: "NH404",
    from: "Cairo",
    to: "Hurghada",
    date: "2026-05-15",
    departure: "14:00",
    arrival: "15:10",
    duration: "1h 10m",
    price: 1950,
    currency: "EGP"
  },
  {
    id: "NH505",
    from: "Alexandria",
    to: "Sharm El-Sheikh",
    date: "2026-05-18",
    departure: "12:00",
    arrival: "13:30",
    duration: "1h 30m",
    price: 2350,
    currency: "EGP"
  },
  {
    id: "NH606",
    from: "Luxor",
    to: "Cairo",
    date: "2026-05-20",
    departure: "16:45",
    arrival: "18:00",
    duration: "1h 15m",
    price: 1850,
    currency: "EGP"
  }
];

/**
 * handleFlightSearch
 * Called when the search form on index.html is submitted.
 * Logs matching flights to the console and shows an alert.
 */
function handleFlightSearch(from, to, date) {
  console.log("--- Flight Search ---");
  console.log("From:", from, "| To:", to, "| Date:", date);

  // Filter matching flights
  var results = flights.filter(function (f) {
    var matchFrom = !from || f.from === from;
    var matchTo = !to || f.to === to;
    var matchDate = !date || f.date === date;
    return matchFrom && matchTo && matchDate;
  });

  if (results.length > 0) {
    var msg = "✈️ Found " + results.length + " flight(s)!\n\n";
    results.forEach(function (f) {
      msg += f.id + ": " + f.from + " → " + f.to +
        " | " + f.departure + " – " + f.arrival +
        " | " + f.price + " " + f.currency + "\n";
    });
    alert(msg);
    console.log("Results:", results);
  } else {
    alert("No flights found for the selected route and date. Please try different options.");
    console.log("No matching flights.");
  }
}
