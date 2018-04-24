import React from 'react';
import { Header, Icon, Label, Menu, Table } from 'semantic-ui-react';
import distance_in_words_to_now from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

export default ({ tasks }) => (
  <div>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="3">
            {' '}
            Tasks ({tasks.length})
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell> ID</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Worker ID</Table.HeaderCell>
          <Table.HeaderCell>Created At</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {!tasks.length ? (
          <Table.Row>
            <Table.Cell>No Any tasks running</Table.Cell>
          </Table.Row>
        ) : (
          tasks.map((task, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Link to={`/task/${task.id}`}>{task.id}</Link>
              </Table.Cell>
              <Table.Cell>{task.type}</Table.Cell>
              <Table.Cell>
                <Link to={`/worker/${task._workerId}`}> {task._workerId}</Link>
              </Table.Cell>
              <Table.Cell>
                {distance_in_words_to_now(task.created_at)}
                <br />
                <small>{format(task.created_at, 'MM/DD/YYYY h:mm:s')}</small>
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table>
  </div>
);
