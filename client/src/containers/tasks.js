import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTask, saveTask, deleteTask, markTask} from '../actions';

class Task extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.todoId = this.props.match.params.todoId;
    this.state = {
      description: '',
      id: null,
    };

    this.props.fetchTask({todoId: this.todoId});
  }
  onSubmit(e) {
    e.preventDefault();
    if (!this.state.description) {
      return;
    }
    this.props.saveTask({
      description: this.state.description,
      todoId: this.todoId,
      id: this.state.id,
    });
    this.setState({description: '', id: null});
  }
  onEdit(index) {
    const {tasks} = this.props.task;
    this.setState({
      description: tasks[index].description,
      id: tasks[index]._id,
    });
    this.taskInpt.focus();
  }
  onDelete(index) {
    const {tasks} = this.props.task;

    this.props.deleteTask({id: tasks[index]._id, todoId: this.todoId});
  }
  onMark(index) {
    const {tasks} = this.props.task;

    this.props.markTask({
      id: tasks[index]._id,
      todoId: this.todoId,
      completed: !tasks[index].completed,
    });
  }
  render() {
    const {tasks} = this.props.task;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <input
              type="text"
              value={this.state.description}
              onChange={e => this.setState({description: e.target.value})}
              className="form-control col"
              placeholder="Enter task..."
              required
              ref={input => (this.taskInpt = input)}
            />
            <div className="col-1">
              <button
                disabled={this.state.description ? false : 'disabled'}
                type="submit"
                className="btn btn-primary"
              >
                {this.state.id ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </form>
        <div className="container mt-3">
          {tasks.map((task, index) => (
            <div className="row border-bottom mb-2 p-2" key={task._id}>
              <div className="col d-flex align-items-center">
                <span className="align-middle">
                  {task.completed ? (
                    <del>{task.description}</del>
                  ) : (
                    task.description
                  )}
                </span>
              </div>
              <div className="col-1 mr-3">
                <a
                  href="javascript:void(0)"
                  onClick={() => this.onMark(index)}
                  className={
                    task.completed ? 'btn btn-danger' : 'btn btn-success'
                  }
                >
                  {task.completed ? 'Undone' : 'Done'}
                </a>
              </div>
              <div className="col-1">
                <a
                  href="javascript:void(0)"
                  onClick={() => this.onEdit(index)}
                  className=" btn btn-primary"
                >
                  Edit
                </a>
              </div>
              <div className="col-1">
                <a
                  href="javascript:void(0)"
                  onClick={() => this.onDelete(index)}
                  className="btn btn-danger"
                >
                  Delete
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({task}) => ({task});

export default connect(
  mapStatesToProps,
  {fetchTask, saveTask, deleteTask, markTask},
)(Task);
