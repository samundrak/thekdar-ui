import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TaskTable from '../components/TaskTable';
import { Button, Pagination, Input } from 'semantic-ui-react';

const DEFAULT_PER_PAGE = 10;
class Tasks extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      query: '',
      perPage: DEFAULT_PER_PAGE,
      activePage: 1,
      from: 0,
      to: DEFAULT_PER_PAGE,
    };
  }
  handlePaginationChange() {
    return (e, { activePage }) => {
      this.setState({
        from: this.state.to,
        to: this.state.to + this.state.perPage,
        activePage,
      });
    };
  }
  handlePerPageChange() {
    return e => {
      this.setState({
        perPage: +e.target.value,
      });
    };
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.app.tasks);
    if (!this.state.query) {
      this.setState({
        tasks: this.props.app.tasks.slice(this.state.from, this.state.to),
      });
    }
  }
  handleSearch() {
    return e => {
      this.setState({
        query: e.target.value,
      });
    };
  }

  handleSearchClick() {
    return () => {
      const query = this.state.query.toLowerCase();
      const tasks =
        this.props.app.tasks.filter(task => {
          return (
            (task.data && task.data.cloud.includes(query)) ||
            task.data.meta.name.toLowerCase().includes(query)
          );
        }) || [];
      this.setState({
        tasks,
      });
    };
  }
  handleSearchClickClear() {
    return e => {
      this.setState({
        query: '',
      });
    };
  }
  render() {
    return (
      <div>
        <Input
          type="text"
          onChange={this.handleSearch()}
          value={this.state.query}
        />
        <Button primary onClick={this.handleSearchClick()}>
          Search
        </Button>
        <Button primary onClick={this.handleSearchClickClear()}>
          Clear
        </Button>
        <hr />
        <Input
          type="number"
          onChange={this.handlePerPageChange()}
          value={this.state.perPage}
        />{' '}
        Per Page
        <Pagination
          activePage={this.state.activePage}
          onPageChange={this.handlePaginationChange()}
          totalPages={this.props.app.tasks.length}
        />
        <TaskTable tasks={this.state.tasks} />
        <Pagination
          activePage={this.state.activePage}
          onPageChange={this.handlePaginationChange()}
          totalPages={this.props.app.tasks.length}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  app: state.app,
});

export default withRouter(connect(mapStateToProps)(Tasks));
