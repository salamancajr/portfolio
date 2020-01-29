import React from 'react';
import Navbar from '../components/Navbar';

export default function() {
	return (
		<div className="body" style={{ alignItems: 'center', justifyContent: 'center' }}>
			<Navbar title="Contact Me" />
			<div class="card contact-card" style={{ maxWidth: '36rem', padding: '2rem', alignSelf: 'center' }}>
				<div class="card-body">
					<p class="card-text contact-text">
						You can contact me by email at
						<a href="mailto: salamancajr@gmail.com"> salamancajr@gmail.com</a> or through any of the
						following social sites.
					</p>
					<a href="https://www.linkedin.com/in/george-salamanca-514b5084/" class="card-link">
						LinkedIn
					</a>
					<a href="https://www.facebook.com/george.salamanca.9" class="card-link">
						Facebook
					</a>
					<a href="https://github.com/salamancajr" class="card-link">
						Github
					</a>
				</div>
			</div>
		</div>
	);
}
