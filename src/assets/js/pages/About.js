import { getAllArtisans } from "../api/artisans.js";

async function loadArtisans() {
    const artisans = await getAllArtisans();
    console.log(artisans);
}
loadArtisans();