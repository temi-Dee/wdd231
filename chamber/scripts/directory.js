const membersContainer = document.querySelector("#members");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Failed to fetch members");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
    membersContainer.innerHTML = "<p>Error loading member directory.</p>";
  }
}

function displayMembers(members) {
  members.forEach((member) => {
    const section = document.createElement("section");
    const levelClass = `level-${member.level}`;
    const levelText = ["Member", "Silver", "Gold"][member.level - 1];

    section.className = levelClass;
    section.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}" loading="lazy">
      <h3>${member.name}</h3>
      <p class="level">${levelText}</p>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a> <!-- cSpell:ignore noopener -->
    `;
    membersContainer.appendChild(section);
  });
}

gridBtn.addEventListener("click", () => {
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
  membersContainer.classList.remove("list");
  membersContainer.classList.add("grid");
});

listBtn.addEventListener("click", () => {
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
  membersContainer.classList.remove("grid");
  membersContainer.classList.add("list");
});

getMembers();
