let currentPage = 0, allGameslength;
const gamesPerPage = 5;

function fetchGames() {
  fetch(`https://snake1gamestax.web.app/userGames/${sessionStorage.getItem("nickname")}`)
    .then(response => response.json())
    .then(games => {
      for (let i = 0; i < gamesPerPage; i++) {
        const game = games[i + currentPage * gamesPerPage];
        allGameslength = (games.length / 5) -1;
        console.log(allGameslength);
        if (game) {
          document.getElementById(`matchName${i+1}`).textContent = 'Гра '+(games.length-(i + currentPage * gamesPerPage));  
          document.getElementById(`date${i + 1}`).textContent = new Date(game.date).toLocaleDateString();
          document.getElementById(`result${i + 1}`).textContent = game.score;
          document.getElementById(`version${i + 1}`).textContent = game.version;
          document.getElementById(`reality${i+1}`).style.display = "flex";
        } else {
          document.getElementById(`reality${i+1}`).style.display = "none";
        }
      }
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('btn-back').addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    fetchGames();
  }
});

document.getElementById('btn-forw').addEventListener('click', () => {
  if (currentPage < allGameslength) {
    currentPage++;
    fetchGames();
  }
});
fetchGames();