const axios = require('axios');

module.exports = {
    fetchPopularRepos: (language) => {
        const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1_language:'+language+'&sort=start&order=desc&type=Repositories');
        return axios.get(encodeURI).then((response) => response.data.items);
    }
}