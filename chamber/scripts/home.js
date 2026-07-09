// ── Weather ──────────────────────────────────────────────────────────────────
const API_KEY = 'your_openweathermap_api_key'; // Replace with your key from openweathermap.org
const LAT = 6.5244;   // Lagos latitude
const LON = 3.3792;   // Lagos longitude
const UNITS = 'metric';

async function fetchWeather() {
  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`)
    ]);

    if (!currentRes.ok || !forecastRes.ok) throw new Error('Weather fetch failed');

    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    displayCurrentWeather(current);
    displayForecast(forecast);
  } catch (err) {
    document.getElementById('weather-temp').textContent = 'Weather unavailable';
    console.error(err);
  }
}

function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  const icon = data.weather[0].icon;

  document.getElementById('weather-temp').innerHTML =
    `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
     <span>${temp}°C</span>`;
  document.getElementById('weather-desc').textContent =
    desc.charAt(0).toUpperCase() + desc.slice(1);
}

function displayForecast(data) {
  // Pick one reading per day at noon (12:00:00) for the next 3 days
  const days = [];
  const seen = new Set();

  for (const item of data.list) {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toDateString();
    const hour = date.getHours();

    if (!seen.has(dateStr) && hour >= 11 && hour <= 13) {
      seen.add(dateStr);
      days.push(item);
      if (days.length === 3) break;
    }
  }

  // Fallback: just grab first entry per unique day if noon not found
  if (days.length < 3) {
    seen.clear();
    days.length = 0;
    for (const item of data.list) {
      const dateStr = new Date(item.dt * 1000).toDateString();
      if (!seen.has(dateStr)) {
        seen.add(dateStr);
        days.push(item);
        if (days.length === 3) break;
      }
    }
  }

  const container = document.getElementById('weather-forecast');
  container.innerHTML = days.map(item => {
    const date = new Date(item.dt * 1000);
    const label = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const temp = Math.round(item.main.temp);
    const icon = item.weather[0].icon;
    const desc = item.weather[0].description;
    return `
      <div class="forecast-day">
        <p class="forecast-label">${label}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
        <p class="forecast-temp">${temp}°C</p>
      </div>`;
  }).join('');
}

// ── Spotlights ────────────────────────────────────────────────────────────────
async function loadSpotlights() {
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error('Failed to fetch members');
    const members = await res.json();

    // Filter gold (3) and silver (2) members only
    const eligible = members.filter(m => m.level === 2 || m.level === 3);

    // Shuffle and pick 2 or 3
    const shuffled = eligible.sort(() => Math.random() - 0.5);
    const picks = shuffled.slice(0, Math.random() < 0.5 ? 2 : 3);

    const container = document.getElementById('spotlights');
    container.innerHTML = picks.map(m => {
      const levelLabel = m.level === 3 ? 'Gold Member' : 'Silver Member';
      const levelClass = m.level === 3 ? 'badge-gold' : 'badge-silver';
      return `
        <div class="spotlight-card spotlight-${m.image.replace('.jpg','').replace('.jpeg','').replace('.png','')}">
          <div class="spotlight-info">
            <h3>${m.name}</h3>
            <span class="membership-badge ${levelClass}">${levelLabel}</span>
            <p>📞 ${m.phone}</p>
            <p>📍 ${m.address}</p>
            <a href="${m.website}" target="_blank" rel="noopener noreferrer">Visit Website</a> <!-- cSpell:ignore noopener noreferrer -->
          </div>
        </div>`;
    }).join('');
  } catch (err) {
    console.error('Spotlight error:', err);
  }
}

fetchWeather();
loadSpotlights();
