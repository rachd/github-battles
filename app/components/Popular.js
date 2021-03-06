const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');
const Loading = require('./Loading');

function SelectLanguage (props) {
	const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
		
	return (<ul className="languages">
		{languages.map((language) => 
		<li style={language === props.selectedLanguage ? { color: "#d0021b"} : null }
			onClick={props.updateLanguage.bind(null, language)} 
			key={language}>{language}
		</li>)}
	</ul>)
}

SelectLanguage.PropTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	updateLanguage: PropTypes.func.isRequired
}

function RepoGrid(props) {
	return(
		<ul className="popular-list">
			{props.repos.map((repo, index) => {
				return <li key={repo.name} className="popular-item">
					<div className="popular-rank">#{index+1}</div>
					<ul className="space-list-items">
						<li><img className="avatar" 
								src={repo.owner.avatar_url} 
								alt={"Avatar for " + repo.owner.login} />
						</li>
						<li><a href={repo.html_url}>{repo.name}</a></li>
						<li>@{repo.owner.login}</li>
						<li>{repo.stargazers_count} stars</li>
					</ul>
				</li>
			})}
		</ul>
	);
}

RepoGrid.PropTypes = {
	repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: "All",
			repos: null
		};
		this.updateLanguage = this.updateLanguage.bind(this);
	}
	updateLanguage(lang) {
		this.setState(() => {
			return {
				selectedLanguage: lang, 
				repos: null
			}
		});
		api.fetchPopularRepos(lang)
		.then((repos) => {
			this.setState(() => {
				return {
					repos: repos
				}
			});
		});
	}
	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}
	render() {	
		return (
			<div>
				<SelectLanguage selectedLanguage={this.state.selectedLanguage}
					updateLanguage={this.updateLanguage}/>
				{!this.state.repos ? <Loading/> : <RepoGrid repos={this.state.repos}/>}
			</div>
		)
	}
}

module.exports = Popular;