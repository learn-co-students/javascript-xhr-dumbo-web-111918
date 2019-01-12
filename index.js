function getRepositories() {
  const test = new XMLHttpRequest();
  test.addEventListener("load", showRepositories);
  test.open("GET", "https://api.github.com/users/taishnore/repos");
  test.send();
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r => "<li>" + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>'
    ).join("")}</ul>`;
    console.log(repoList)
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repo;
  const test = new XMLHttpRequest();
  test.addEventListener("load", showCommits);
  test.open("GET", "https://api.github.com/repos/taishnore/" + name +"/commits");
  test.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        "<li><strong>" +
        commit.commit.author.name +
        "</strong> - " +
        commit.commit.message +
        "</li>"
    )
    .join("")}</ul>`;
  document.getElementById("commits").innerHTML = commitsList;
}
