import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTodo, saveTodo, deleteTodo} from '../actions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      todo: '',
      id: null,
    };
    this.props.fetchTodo();
  }
  onSubmit(e) {
    e.preventDefault();
    if (!this.state.todo) {
      return;
    }
    this.props.saveTodo({name: this.state.todo, id: this.state.id});
    this.setState({todo: '', id: null});
  }
  onEdit(index) {
    const {todos} = this.props.todo;
    this.setState({todo: todos[index].name, id: todos[index]._id});
    this.todoInpt.focus();
  }
  onDelete(index) {
    const {todos} = this.props.todo;

    this.props.deleteTodo(todos[index]._id);
  }
  openTaskList(index) {
    const {todos} = this.props.todo;
    this.props.history.push(`/tasks/${todos[index]._id}`);
  }
  render() {
    const {todos} = this.props.todo;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <input
              type="text"
              value={this.state.todo}
              onChange={e => this.setState({todo: e.target.value})}
              className="form-control col"
              placeholder="Enter todo list name..."
              required
              ref={input => (this.todoInpt = input)}
            />
            <div className="col-1">
              <button
                disabled={this.state.todo ? false : 'disabled'}
                type="submit"
                className="btn btn-primary"
              >
                {this.state.id ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </form>
        <div className="container mt-3">
          {todos.map((todo, index) => (
            <div className="row border-bottom mb-2 p-2" key={todo._id}>
              <a
                href="javascript:void(0)"
                onClick={() => this.openTaskList(index)}
                className="col d-flex align-items-center"
              >
                <span className="align-middle">{todo.name}</span>
              </a>
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

const mapStatesToProps = ({todo}) => ({todo});

export default connect(
  mapStatesToProps,
  {fetchTodo, saveTodo, deleteTodo},
)(Dashboard);
