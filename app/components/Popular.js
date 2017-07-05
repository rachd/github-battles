const React = require('react');

class Popular extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedLanguage: 'All'
		};
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	updateLanguage(lang) {
		this.setState({selectedLanguage: lang});
	}

    render() {
    	const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
        return(
            <ul className="languages">
            	{languages.map((lang) => <li style={lang === this.state.selectedLanguage ? { color: '#d0021b'}: null} key={lang} onClick={this.updateLanguage.bind(null, lang)}>{lang}</li>, this)}
            </ul>
        )
    }
}

module.exports = Popular;