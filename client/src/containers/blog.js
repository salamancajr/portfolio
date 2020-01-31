import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import { likeBlog, selectBlog, fetchBlog } from '../actions'

import { connect } from 'react-redux'
import _ from 'lodash'
import Loading from '../components/Loading'
import ipAddress from '../utils/ipAddress'

class AllBlogs extends Component {
	state = {
	  isLoaded: false
	};

	async componentDidMount () {
	  window.scrollTo(0, 0)
	}

	componentDidUpdate (prevProps) {
	  const { selectedBlog, history } = this.props
	  if (selectedBlog !== prevProps.selectedBlog) {
	    history.push('/SelectedBlog')
	  }
	}

	goToBlog (e) {
	  this.props.selectBlog(e.target.id)
	}

	handleClickLike (e) {
	  const { id } = e.target

	  this.props.likeBlog(id, ipAddress.ipAddress)
	}

	render () {
	  const { loading } = this.state
	  return (
	    <div className="blog-body" style={this.state.loading ? null : { width: '100vw', height: 'auto' }}>
	      {loading ? (
	        <div style={{ height: '100vh' }}>
	          <Loading />
	        </div>
	      ) : (
	        _.map(this.props.blog, (blog) => {
	          var subString = blog.text.substr(0, 200) + '...'

	          return (
	            <div key={blog._id} className="blog-entry">
	              <div className="blog-entry__header">
	                <div className="blog-entry__header--column-1">
	                  <h3 id={blog._id} onClick={this.goToBlog.bind(this)}>
	                    {blog.title}
	                  </h3>
	                  <span className="blog-entry__time">Created {blog.time ? blog.time : ''}</span>
	                </div>
	                <div className="blog-entry__header--column-2">
	                  <div id={blog._id} className="blog-entry__icon">
	                    {blog.likes.includes(ipAddress.ipAddress) ? (
	                      <i
	                        id={blog._id}
	                        className="far fa-star pointer"
	                        onClick={this.handleClickLike.bind(this)}
	                      />
	                    ) : (
	                      <i
	                        id={blog._id}
	                        onClick={this.handleClickLike.bind(this)}
	                        class="fas fa-star pointer"
	                        style={{ color: 'purple' }}
	                      />
	                    )}
	                    <span>{blog.likes.length}</span>
	                  </div>
	                  <div className="blog-entry__icon">
	                    <a
	                      href={`https://twitter.com/intent/tweet?text=Visit https://www.georgesalamanca.com/BlogEntry?${blog._id} to read more about ${blog.title}`}
	                      target="_blank"
	                    >
	                      <i className="fas fa-share pointer share" />
	                    </a>
	                  </div>
	                </div>
	              </div>

	              <img className="blog-entry__img" src={blog.img} alt={blog.title} />
	              <div className="blog-entry__snippet">{subString}</div>
	            </div>
	          )
	        })
	      )}

	      <Navbar title="My Blogs" />
	    </div>
	  )
	}
}

function mapStateToProps (state) {
  return {
    blog: state.blog,
    loading: state.ui.isLoading,
    selectedBlog: state.selectedBlog
  }
}

export default connect(mapStateToProps, { fetchBlog, likeBlog, selectBlog })(AllBlogs)
