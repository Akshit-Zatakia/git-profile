const APIURL = "https://api.github.com/users/";

// get the main component to load our card
const main = document.getElementById("main");
// get the form element
const form = document.getElementById("form");
// get the search input element
const search = document.getElementById("search");
// get the button
const btn = document.getElementById("btn");

getUser("Akshit-Zatakia");

async function getUser(user) {
  const res = await fetch(APIURL + user);
  const data = await res.json();

  createUserCard(data);
  getRepos(user);
}

async function getRepos(user) {
  const res = await fetch(APIURL + user + "/repos");
  const data = await res.json();
  addReposToCard(data);
}

function createUserCard(user) {
  // creating the card
  const cardHTML = `
    <div class="card">
        <div>
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul>
                <li><strong>Followers </strong>${user.followers}</li>
                <li><strong>Following </strong>${user.following}</li>
                <li><strong>Repos </strong>${user.public_repos}</li>
            </ul>
            <h4>Repos: </h4>
            <div id="repos"></div>
        </div>
    </div>    
    `;

  main.innerHTML = cardHTML;
}

function takeSS() {
  html2canvas(main, {
    allowTaint: true,
    useCORS: true,
  }).then((e) => {
    const bs = e.toDataURL();
    var link = document.createElement("a");

    document.body.appendChild(link); // for Firefox

    link.setAttribute("href", bs);
    link.setAttribute("download", "git-profile");
    link.click();
  });
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .forEach((element) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");

      repoEl.href = element.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = element.name;

      reposEl.appendChild(repoEl);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // get the value from input field
  const user = search.value;

  // check if user exists
  if (user) {
    // call get user
    getUser(user);
    // empty the input value
    search.value = "";
  }
});
