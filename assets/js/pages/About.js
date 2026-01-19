import { getAllArtisans } from "../api/artisans.js";

async function loadArtisans() {
    const artisans = await getAllArtisans();
    console.log(artisans);
}
loadArtisans();

document.querySelectorAll('.cta-buttons button').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Action coming soon!');
  });
});u