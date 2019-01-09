let showRepositories = function(event, date) {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        "<li>" +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join("")}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;

}

let getRepositories = function() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", "https://api.github.com/users/octocat/repos");
  req.send();
}

let getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open("GET", "https://api.github.com/repos/octocat/" + name + "/commits");
  req.send();
}

let showCommits = function() {
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
