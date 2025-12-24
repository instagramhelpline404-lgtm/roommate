/* =========================
   LOGIN CHECK
========================= */
const user = localStorage.getItem("memeUser");
if (!user) {
  window.location.href = "meme-login.html";
}

/* =========================
   REACTION STORAGE
   Structure:
   reactions = {
     postId: {
       username: "like" | "laugh" | "love" | "wow"
     }
   }
========================= */
const reactions = {};

/* =========================
   TOGGLE EMOJI POPUP
========================= */
function togglePopup(btn) {
  const popup = btn.nextElementSibling;
  popup.style.display =
    popup.style.display === "flex" ? "none" : "flex";
}

/* =========================
   REACT FUNCTION
========================= */
function react(postId, type) {
  if (!reactions[postId]) reactions[postId] = {};

  const previousReaction = reactions[postId][user];

  // Remove previous reaction count
  if (previousReaction) {
    const prevEl = document.getElementById(
      previousReaction + "-" + postId
    );
    prevEl.innerText = Number(prevEl.innerText) - 1;
  }

  // Toggle same reaction
  if (previousReaction === type) {
    delete reactions[postId][user];
  } else {
    const newEl = document.getElementById(type + "-" + postId);
    newEl.innerText = Number(newEl.innerText) + 1;
    reactions[postId][user] = type;
  }

  // Close popup after click
  event.target.parentElement.style.display = "none";
}

/* =========================
   CLOSE POPUP ON OUTSIDE CLICK
========================= */
document.addEventListener("click", (e) => {
  document.querySelectorAll(".reaction-popup").forEach(popup => {
    if (!popup.parentElement.contains(e.target)) {
      popup.style.display = "none";
    }
  });
});
