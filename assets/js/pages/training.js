const trainingCheckboxIds = [
  "cb-onshape",
  "cb-equipment-laser",
  "cb-equipment-3d",
  "cb-robotis",
  "cb-csharp"
];

function updateProgress() {
  const checkboxes = trainingCheckboxIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const checkedCount = checkboxes.filter((checkbox) => checkbox.checked).length;
  const percentage = Math.round((checkedCount / trainingCheckboxIds.length) * 100);
  const text = document.getElementById("progress-text");
  const bar = document.getElementById("progress-bar");
  const meter = document.querySelector("[role='progressbar']");

  checkboxes.forEach((checkbox) => {
    localStorage.setItem(`training_${checkbox.id}`, String(checkbox.checked));
  });

  if (text) text.textContent = `${percentage}%`;
  if (bar) bar.style.width = `${percentage}%`;
  meter?.setAttribute("aria-valuenow", String(percentage));
}

document.addEventListener("DOMContentLoaded", () => {
  trainingCheckboxIds.forEach((id) => {
    const checkbox = document.getElementById(id);
    if (!checkbox) return;

    checkbox.checked = localStorage.getItem(`training_${id}`) === "true";
    checkbox.addEventListener("change", () => {
      updateProgress();
      window.playSynth?.("select");
    });
  });

  updateProgress();
});
