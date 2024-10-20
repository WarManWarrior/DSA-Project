function openPopup(popupId) {
    let popup = document.getElementById(popupId);
    popup.classList.add('open-popup');
}

function closePopup(popupId) {
    let popup = document.getElementById(popupId);
    popup.classList.remove('open-popup');
}
