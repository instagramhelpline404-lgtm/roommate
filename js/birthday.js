const cards = document.querySelectorAll(".birthday-card");
const today = new Date();
const month = today.getMonth() + 1;
const day = today.getDate();

let birthdayPerson = null;

cards.forEach(card => {
  const [m, d] = card.dataset.date.split("-").map(Number);
  const countdown = card.querySelector(".countdown");

  if (m === month && d === day) {
    card.classList.add("today");
    countdown.innerText = "🎉 TODAY!";
    birthdayPerson = card.dataset.name;
  } else {
    let next = new Date(today.getFullYear(), m - 1, d);
    if (next < today) next.setFullYear(today.getFullYear() + 1);
    const daysLeft = Math.ceil((next - today) / (1000 * 60 * 60 * 24));
    countdown.innerText = `⏳ ${daysLeft} days left`;
  }
});

/* If Birthday Today */
if (birthdayPerson) {
  showModal(birthdayPerson);
  startConfetti();
  document.getElementById("birthdayMusic").play();
}

/* Modal */
function showModal(name) {
  document.getElementById("birthdayName").innerText =
    `Happy Birthday ${name}! 🎂🎉`;
  document.getElementById("birthdayModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("birthdayModal").style.display = "none";
}

/* Confetti */
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const confetti = Array.from({ length: 180 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 3,
    d: Math.random() * 3 + 2,
    c: `hsl(${Math.random() * 360},100%,50%)`
  }));

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.fill();
      p.y += p.d;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(animate);
  }
  animate();
}
