const axios = require('axios');

function getProfile(username) {
    return axios.get(`http://api.github.com/users/${username}`)
    .then((user) => {
        return user.data;
    });
}

function getRepos(username) {
    return axios.get(`http://api.github.com/users/${username}/repos?per_page=100`);
}

function getStarCount(repos) {
    return repos.data.reduce((count, repo) => {
        return count + repo.stargazers_count;
    }, 0);
}

function calculateScore(profile, repos) {
    const followers = profile.followers;
    const totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
}

function handleError(error) {
    console.warn(error);
    return null;
}

function getUserData(player) {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then((data) => {
        const profile = data[0];
        const repos = data[1];
        return {
            profile: profile,
            score: calculateScore(profile, repos)
        }
    });
}

function sortPlayers(players) {
    return players.sort((a, b) => b.score - a.score);
}

module.exports = {
    battle: (players) => {
        return axios.all(players.map(getUserData))
        .then(sortPlayers)
        .catch(handleError);
    },
    fetchPopularRepos: (language) => {
        const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+language+'&sort=start&order=desc&type=Repositories');
        return axios.get(encodedURI).then((response) => response.data.items);
    }
}