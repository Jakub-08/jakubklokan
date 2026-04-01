document.addEventListener('click', function(event) {
  const menuCheckbox = document.getElementById('toggle-menu');
  const mobilniMenu = document.querySelector('.mobilni-menu');
  if (
    menuCheckbox &&
    menuCheckbox.checked &&
    !mobilniMenu.contains(event.target)
  ) {
    menuCheckbox.checked = false;
  }
});

function formatDate(isoDate) {
  const d = new Date(isoDate);
  return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
}




