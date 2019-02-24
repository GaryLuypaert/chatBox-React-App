import React from 'react';

class Formulaire extends React.Component {

	state = {
		length: this.props.length
	};

		createMessage = event => {
		event.preventDefault();

		const message = {
			pseudo : this.props.pseudo,
			message: this.message.value
		}

		this.props.addMessage(message);
		this.messageForm.reset();

		const length = this.props.length;
		this.setState({length});
	};

	compteur = event => {

		const length = this.props.length - this.message.value.length

		this.setState({length});

	};


	
	render() {
		return (

			<form className="form" 
			onSubmit={(e) => this.createMessage(e)}
			ref={(input) => this.messageForm = input}>

				<textarea maxLength={this.props.length} 
				required
				ref={(input) => this.message = input}
				onChange={(e) => this.compteur(e)}>
				</textarea>

				<div className="info">
					{this.state.length}
				</div>

				<button type="submit">Envoyer</button>

			</form>

		)
	}
	static propTypes = {
		addMessage: React.PropTypes.func.isRequired,
		length: React.PropTypes.number.isRequired,
		pseudo: React.PropTypes.string.isRequired
	};
}

export default Formulaire;