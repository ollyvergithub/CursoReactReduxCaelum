import React from 'react'

class NamesList extends React.Component {
	constructor() {
		super()
		this.state = {
			inputName: '',
			names: [],
		}
	}

	setInputName = (e) => {
		this.setState({ inputName: e.target.value })
	}

	addName = () => {
		this.setState((state) => ({
			names: [state.inputName, ...state.names],
			inputName: '',
		}))
  }
  
  removeName = (indexToRemove) => {
    this.setState((state) => ({
      names: state.names.filter((name, index) => index !== indexToRemove)
    }))
  }

	render() {
		return (
			<div>
				<input type="text" onChange={this.setInputName} value={this.state.inputName} />
				<button onClick={this.addName}>Clique aqui</button>
				<br />
				<h3>List of Names:</h3>
				<ul>
					{
						this.state.names.map((name, index) => {
							return (
								<li>
									{name}
									<button onClick={() => this.removeName(index)}>X</button>
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}

export default NamesList