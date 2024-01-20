document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("getRepoButton")
    .addEventListener("click", function () {
      let username = document.getElementById("usernameInput").value;
      fetch(`https://api.github.com/users/${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("User not found");
          }
          return response.json();
        })
        .then((user) => {
          // Update the user details
          const userDetailsDiv = document.querySelector(".user_detaile");
          userDetailsDiv.innerHTML = `
                    <p><a href="${
                      user.html_url
                    }" target="_blank">GitHub Profile</a></p>
                    <p>  ${user.name || username}</p>
                    <p><svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo UnderlineNav-octicon">
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                </svg>  Repositories: ${user.public_repos}</p>
                    <p> <svg text="muted" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-people">
                    <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path>
                </svg>  Followers: ${user.followers}  Following: ${
            user.following
          }</p>`;
          // Update the avatar image
          document.getElementById("userAvatar").src = user.avatar_url;
        })
        .catch((error) => {
          console.error("Error:", error);
          document.querySelector(".user_detaile").textContent =
            "User details not found.";
          document.getElementById("userAvatar").src = "default_image.jpg";
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("getRepoButton")
    .addEventListener("click", function () {
      let username = document.getElementById("usernameInput").value;
      fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Repositories not found");
          }
          return response.json();
        })
        .then((repos) => {
          const repoContainer = document.getElementById("repoContainer");
          repoContainer.innerHTML = "";
          repos.forEach((repo) => {
            const repoDiv = document.createElement("div");
            repoDiv.classList.add("repo");

            const repoNameP = document.createElement("h4");
            repoNameP.textContent = `Repository: ${repo.name}`;
            repoDiv.appendChild(repoNameP);

            const repoLanguageP = document.createElement("h5");
            repoLanguageP.textContent = `Language: ${
              repo.language || "No language specified"
            }`;
            repoDiv.appendChild(repoLanguageP);

            const repoDetailsDiv = document.createElement("div");
            repoDetailsDiv.classList.add("repo-details");

            const repoDescriptionP = document.createElement("p");
            repoDescriptionP.classList.add("repo-description");
            const truncatedDescription =
              repo.description && repo.description.length > 200
                ? repo.description.substring(0, 100) + "...(more)"
                : repo.description || "No description";
            repoDescriptionP.textContent = truncatedDescription;
            repoDetailsDiv.appendChild(repoDescriptionP);

            const repoStarsP = document.createElement("p");
            repoStarsP.textContent = `Stars: ${repo.stargazers_count}`;
            repoDetailsDiv.appendChild(repoStarsP);

            const repoUpdatedP = document.createElement("p");
            repoUpdatedP.textContent = `Last Updated: ${new Date(
              repo.updated_at
            ).toLocaleDateString()}`;
            repoDetailsDiv.appendChild(repoUpdatedP);

            // Append the details div to the main repo div
            repoDiv.appendChild(repoDetailsDiv);

            // Append the main repo div to the container
            repoContainer.appendChild(repoDiv);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          document.getElementById("repoContainer").textContent =
            "No public repositories found or user not found.";
        });
    });
});
