// Open image fullscreen
function openModal(img) {
  document.getElementById("imgModal").style.display = "flex";
  document.getElementById("modalImg").src = img.src;
}

// Close modal
function closeModal() {
  document.getElementById("imgModal").style.display = "none";
}

// Like button
function like(btn) {
  let span = btn.querySelector("span");
  span.innerText = parseInt(span.innerText) + 1;
}
