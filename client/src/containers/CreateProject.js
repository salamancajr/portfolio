import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { authenticateRoute, addProject } from '../actions';
import { TextInput, TextArea, FileInput } from '../components/Forms';

class NewProject extends Component {
	componentDidUpdate(prevProps) {
		const { history, projects } = this.props;
		if (prevProps.projects.length + 1 === projects.length) {
			history.push('/Admin');
		}
	}

	render() {
		const { handleSubmit, addProject } = this.props;
		return (
			<div className="body" style={{ justifyContent: 'center' }}>
				<Navbar />
				<div
					style={{
						padding: '3rem',
						backgroundColor: 'white',
						flexDirection: 'column',
						width: '40rem',
						justifyContent: 'center',
						alignSelf: 'center'
					}}
				>
					<form id="blogform" onSubmit={handleSubmit((values) => addProject(values))}>
						<Field label="Title" name="title" component={TextInput} />
						<Field label="Github Link" name="githubLink" component={TextInput} />
						<Field label="youtube Link" name="youtubeLink" component={TextInput} />
						<Field label="Link" name="link" component={TextInput} />
						<Field label="description" name="description" component={TextArea} />
						<Field name="img" component={FileInput} />
						<button className="admin-login" type="submit">
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};
	return errors;
}

export default reduxForm({
	validate,
	form: 'NewForm'
})(connect(({ projects }) => ({ projects }), { addProject, authenticateRoute })(NewProject));
