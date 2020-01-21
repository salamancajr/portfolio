import React, { Component } from 'react'
import Navbar from '../components/navbar'
import { patchItem, selectedBlog } from '../actions'
import { fetchBlog } from '../sagas/blogSagas'
import { connect } from 'react-redux'
import _ from 'lodash'
import { sagaMiddleware } from '../'
import Loading from '../components/Loading'

class Blog extends Component {
    state={
      isLoaded: false,
      ipAddress: -1
    }

    async componentDidMount () {
      window.scrollTo(0, 0)
      sagaMiddleware.run(fetchBlog, ipAddress => this.setState({ isLoaded: true, ipAddress }))
    }

    goToBlog (e) {
      const prom = new Promise((resolve, reject) => {
        resolve(this.props.selectedBlog(e.target.id))
      })

      prom.then(() => {
        this.props.history.push('/BlogEntry')
      })
    }

    handleClickLike (e) {
      
      const event = e.target

 
  
      this.props.patchItem(event, this.state.ipAddress, () => {

      })
    }

    render () {
      return (
        <div
          className="blog-body" style={this.state.loading ? null : { width: '100vw', height: 'auto' }}>
          {this.props.loading
            ? <Loading/>
            : _.map(this.props.blog, blog => { 
 

              var subString = blog.text.substr(0, 200) + '...'

              return (
                <div key={blog._id} className="blog-entry">
                  <div className="blog-entry__header">
                    <div className="blog-entry__header--column-1">

                      <h3 id={blog._id} onClick={this.goToBlog.bind(this)}>{blog.title}</h3>

                      <span className="blog-entry__time">Created {blog.time ? blog.time : ''}</span>
                    </div>
                    <div className="blog-entry__header--column-2">
                      <div id={blog._id} className="blog-entry__icon">
                        {blog.likes.indexOf(this.state.ipAddress) === -1
                          ? <i id={blog._id} className="far fa-star pointer" onClick={this.handleClickLike.bind(this)}></i>
                          : <i id={blog._id} onClick={this.handleClickLike.bind(this)} class="fas fa-star pointer" style={{ color: 'purple' }}></i>

                        }
                        <span>{blog.likes.length}</span>
                      </div>
                      <div className="blog-entry__icon">

                        <a href={`https://twitter.com/intent/tweet?text=Visit https://www.georgesalamanca.com/BlogEntry?${blog._id} to read more about ${blog.title}`} target="_blank">
                          <i className="fas fa-share pointer share"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <img className="blog-entry__img" src={blog.img} alt={blog.title} />
                  <div className="blog-entry__snippet">

                    {subString}

                  </div>
                </div>

              )
            })

          }

          <Navbar title="My Blogs"/>
        </div>)
    }
}

function mapStateToProps (state) {
  return {
    blog: state.blog,
    loading: state.ui.isLoading
  }
}

export default connect(mapStateToProps, { fetchBlog, patchItem, selectedBlog })(Blog)
