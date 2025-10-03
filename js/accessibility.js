const accessibilityBtn = document.getElementById('accessibilityBtn');
const accessibilityPanel = document.getElementById('accessibilityPanel');
const increaseFont = document.getElementById('increaseFont');
const decreaseFont = document.getElementById('decreaseFont');
const toggleContrast = document.getElementById('toggleContrast');
const resetAccessibility = document.getElementById('resetAccessibility');

accessibilityBtn.addEventListener('click', () => {
  accessibilityPanel.classList.toggle('hidden');
});

increaseFont.addEventListener('click', () => {
  document.body.classList.remove('font-size-decreased');
  document.body.classList.add('font-size-increased');
});

decreaseFont.addEventListener('click', () => {
  document.body.classList.remove('font-size-increased');
  document.body.classList.add('font-size-decreased');
});

toggleContrast.addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
});

resetAccessibility.addEventListener('click', () => {
  document.body.classList.remove('high-contrast', 'font-size-increased', 'font-size-decreased');
});