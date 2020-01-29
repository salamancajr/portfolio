export default () => (
  <div id={`warning${project._id}`} className="warning">
    <h3>
        Are you sure you want to delete <span className="warning__span">{project.title}?</span>
    </h3>
    <button
      id={project._id}
      onClick={this.callToDelete.bind(this)}
      className="warning__button pointer">
                            Delete
    </button>
    <button onClick={() => document.getElementById(`warning${project._id}`).style.display = 'none'} className="warning__button pointer">
                            Cancel
    </button>
  </div>
)
