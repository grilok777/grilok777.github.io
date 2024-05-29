fetch('https://snake1gamestax.web.app/leaderBoard')
  .then(response => response.json())
  .then(users => {
    
    for (let i = 0; i < 5; i++) {
      if (users[i]) {
        document.getElementById(`leaderImg${i+1}`).src = users[i].imagePath;
        document.getElementById(`leaderName${i+1}`).textContent = users[i].nickname;
        document.getElementById(`leaderDate${i + 1}`).textContent = new Date(users[i].registrationDate).toLocaleDateString();
        document.getElementById(`leaderResult${i+1}`).textContent = users[i].record;
        document.getElementById(`leaderVersion${i + 1}`).textContent = users[i].version; 
      }
      else {
        document.getElementById(`reality${i + 1}`).style.display = "none";  
      } 
    }  
  })
  .catch(error => console.error('Error:', error));