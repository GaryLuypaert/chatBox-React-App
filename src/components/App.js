import React from 'react';
import Formulaire from './Formulaire';
import Message from './Message';
import keydown from 'react-keydown';
// Import base
import base from '../base';
// Import CSS
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../animation.css';

class App extends React.Component {

	// States
	state = {
		messages: {}
	};


	// Cycles de vie du componentn
	componentWillMount() {
		this.ref = base.syncState('/messages', {
			context: this,
			state: 'messages'
		});
	}

	componentDidUpdate() {
		// Scroll en bas
		this.messages.scrollTop = this.messages.scrollHeight;
	}

	// Fonctions
	addMessage = (message) => {
		// Copier le state
		const messages = {...this.state.messages};
		// Ajouter le timestamp
		const timestamp = Date.now();
		messages[`message-${timestamp}`] = message; 
		// Supprimer plus de 10 messages (slice coupe en gardant les 10 derniers, quand il dépasse, il supprime avec le null)
		Object.keys(messages).slice(0, -10).map(key => messages[key] = null)
		// MAJ du state
		this.setState({messages});
	};

	isUser = (pseudo) => {
		return pseudo === this.props.params.pseudo;
	};
	
	render() {
		// Renvoi un tableau avec clé du message (le .map sert de boucle)
		const messages = Object
			.keys(this.state.messages)
			.map(key => <Message key={key} details={this.state.messages[key]} isUser={this.isUser} />);

		return(
			<div>
				<div className="box">
					<div className="messages" ref={(input) => this.messages = input}>
						<ReactCSSTransitionGroup
						component="div"
						className="message"
						transitionName="message"
						transitionEnterTimeout={200}
						transitionLeaveTimeout={200}
						>
							{messages}
						</ReactCSSTransitionGroup>
					</div>
					<Formulaire addMessage={this.addMessage}
					pseudo={this.props.params.pseudo}
					length={280} />
				</div>
			</div>
		)
	}

	static propTypes = {
		params: React.PropTypes.object.isRequired
	};
}

export default App;