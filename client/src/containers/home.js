import React, { Component } from 'react';
import Navbar from '../components/Navbar';

export default class App extends Component {
	render() {
		return (
			<div className="body" style={{ minHeight: '500px' }}>
				<Navbar title="Home | George Salamanca" />
				<div className="body__container-row">
					<div class="card" style={{ maxWidth: '36rem', padding: '2rem' }}>
						<div class="card-body text-dark">
							<h3 class="card-title">Welcome to my developer page.</h3>
							<p class="card-text">
								You'll find a little info about me. You can see some of my projects and find my contact
								information. Enjoy!.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
