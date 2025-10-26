document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("week-select");
  const tableBody = document.querySelector("#leaderboard-table tbody");
  const weekTitle = document.getElementById("week-title");
  const commentaryContainer = document.getElementById("commentary-content");

  // Load list of available weeks from a manifest
  fetch("data/index.json")
    .then((r) => r.json())
    .then((manifest) => {
      // Sort by week descending
      const weeks = (manifest.weeks || []).slice().sort((a, b) => b.week - a.week);

      // Populate dropdown
      dropdown.innerHTML = "";
      weeks.forEach((w) => {
        const opt = document.createElement("option");
        opt.value = w.file;
        opt.textContent = w.label || `Week ${w.week}`;
        dropdown.appendChild(opt);
      });

      // Default to the newest
      if (weeks.length) {
        loadLeaderboard(weeks[0].file);
        dropdown.value = weeks[0].file;
      } else {
        weekTitle.textContent = "No weeks found yet.";
      }
    })
    .catch((err) => {
      console.error("Failed to load weeks manifest:", err);
      weekTitle.textContent = "Error loading weeks manifest 😭";
    });

  dropdown.addEventListener("change", () => loadLeaderboard(dropdown.value));

  function loadLeaderboard(file) {
    fetch(`data/${file}`)
      .then((response) => response.json())
      .then((data) => {
        // Update Week Title
        weekTitle.textContent = `Week ${data.week} Power Rankings`;

        // Build table rows
        tableBody.innerHTML = "";
        (data.rankings || []).forEach((team) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${team.rank ?? ""}</td>
            <td>${team.team ?? ""}</td>
            <td>${team.record ?? ""}</td>
            <td>${team.points ?? ""}</td>
          `;
          tableBody.appendChild(row);
        });

        // Build Commentary
        commentaryContainer.innerHTML = "";
        if (data.commentary && data.commentary.length) {
          data.commentary.forEach((entry) => {
            const article = document.createElement("article");
            article.classList.add("commentary-entry");
            article.innerHTML = `
              <h3>${entry.title ?? "Untitled"}</h3>
              <p>${entry.body ?? ""}</p>
            `;
            commentaryContainer.appendChild(article);
          });
        } else {
          commentaryContainer.innerHTML = `<p>No commentary for this week yet — drop a spicy recap 🔥</p>`;
        }
      })
      .catch((error) => {
        console.error("Error loading leaderboard:", error);
        weekTitle.textContent = "Error loading data 😭";
        tableBody.innerHTML = "";
        commentaryContainer.innerHTML = "";
      });
  }
});
