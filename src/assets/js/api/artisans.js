// when backend is ready,the file should be changed.
export async function getAllArtisans() {
    const response = await fetch("../mocks/artisans.json");
    return response.json()
}