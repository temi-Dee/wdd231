// ===== Data (edit "completed" to reflect your own progress) =====
const courses = [
  { code: 'CSE 110', title: 'Introduction to Programming', credits: 2, prefix: 'CSE', completed: false },
  { code: 'CSE 111', title: 'Programming with Functions', credits: 2, prefix: 'CSE', completed: false },
  { code: 'CSE 210', title: 'Programming with Classes', credits: 2, prefix: 'CSE', completed: false },
  { code: 'WDD 130', title: 'Web Fundamentals', credits: 2, prefix: 'WDD', completed: false },
  { code: 'WDD 131', title: 'Dynamic Web Fundamentals', credits: 2, prefix: 'WDD', completed: false },
  { code: 'WDD 231', title: 'Web Frontend Development I', credits: 2, prefix: 'WDD', completed: false }
];

// ===== DOM references =====
const grid = document.getElementById('courseGrid');
const total = document.getElementById('creditTotal');
const btnAll = document.getElementById('filterAll');
const btnCSE = document.getElementById('filterCSE');
const btnWDD = document.getElementById('filterWDD');
const buttons = [btnAll, btnCSE, btnWDD];

// ===== Render helpers =====
function render(list) {
  // Clear
  grid.innerHTML = '';

  // Create simple cards
  list.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card' + (course.completed ? ' completed' : '');
    card.innerHTML = `
      <span class="title">${course.code}</span>
      <span class="meta">${course.credits} cr</span>
    `;
    card.title = `${course.title}`;
    grid.appendChild(card);
  });

  // Running total of credits for the current view
  const credits = list.reduce((sum, c) => sum + c.credits, 0);
  total.textContent = `The total credits for courses shown above is ${credits}.`;
}

function setActive(btn) {
  buttons.forEach(b => b.classList.toggle('is-active', b === btn));
}

// ===== Filters =====
btnAll.addEventListener('click', () => {
  setActive(btnAll);
  render(courses);
});

btnCSE.addEventListener('click', () => {
  setActive(btnCSE);
  render(courses.filter(c => c.prefix === 'CSE'));
});

btnWDD.addEventListener('click', () => {
  setActive(btnWDD);
  render(courses.filter(c => c.prefix === 'WDD'));
});

// Initial load
render(courses);

