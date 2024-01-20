document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('getRepoButton').addEventListener('click', function() {
        let username = document.getElementById('usernameInput').value;
        fetch(`https://api.github.com/users/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('User not found');
                }
                return response.json();
            })
            .then(user => {
                // Update the user details
                const userDetailsDiv = document.querySelector('.user_detaile');
                userDetailsDiv.innerHTML = `
                    <p><a href="${user.html_url}" target="_blank">GitHub Profile</a></p>
                    <p>Name: ${user.name || username}</p>
                    <p>Repositories: ${user.public_repos}</p>
                    <p>Followers: ${user.followers}</p>
                    <p>Following: ${user.following}</p>
                `;
                // Update the avatar image
                document.getElementById('userAvatar').src = user.avatar_url;
            })
            .catch(error => {
                console.error('Error:', error);
                document.querySelector('.user_detaile').textContent = 'User details not found.';
                document.getElementById('userAvatar').src = 'default_image.jpg';
            });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('getRepoButton').addEventListener('click', function() {
        let username = document.getElementById('usernameInput').value;
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Repositories not found');
                }
                return response.json();
            })
            .then(repos => {
                const repoContainer = document.getElementById('repoContainer');
                repoContainer.innerHTML = ''; // Clear previous content
                repos.forEach(repo => {
                    const repoDiv = document.createElement('div');
                    repoDiv.classList.add('repo');

                    const repoNameP = document.createElement('h5');
                    repoNameP.textContent = `Repository: ${repo.name}`;
                    repoDiv.appendChild(repoNameP);

                    const repoLanguageP = document.createElement('h5');
                    repoLanguageP.textContent = `Language: ${repo.language || 'No language specified'}`;
                    repoDiv.appendChild(repoLanguageP);

                    repoContainer.appendChild(repoDiv);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('repoContainer').textContent = 'No public repositories found or user not found.';
            });
    });
});