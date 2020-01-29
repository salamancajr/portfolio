import React, { Component } from 'react';
import { selectBlog } from '../actions';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import marked from 'marked';

class BlogEntry extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		try {
			const { selectedBlog } = this.props;

			return (
				<div className="blog-body">
					<div className="blog-story">
						<h2 className=" blog-story__heading">{selectedBlog.title ? selectedBlog.title : ''}</h2>
						<div style={{ background: 'purple' }}>
							<img className=" blog-story__img" src={selectedBlog.img} alt={selectedBlog.title} />
						</div>
						<span className="blog-story__time">{selectedBlog.time}</span>
						<div
							className="blog-story__text"
							dangerouslySetInnerHTML={{ __html: marked(selectedBlog.text) }}
						/>
					</div>
					<Navbar title="My Blogs" />
				</div>
			);
		} catch (e) {
			return <div>Loading...</div>;
		}
	}
}
function mapStateToProps(state) {
	return {
		selectedBlog: state.selectedBlog
	};
}
export default connect(mapStateToProps, { selectBlog })(BlogEntry);
