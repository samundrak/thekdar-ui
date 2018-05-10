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
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Worker ID</Table.HeaderCell>
          <Table.HeaderCell>Cloud Type</Table.HeaderCell>
          <Table.HeaderCell>Url</Table.HeaderCell>
          <Table.HeaderCell>Created At</Table.HeaderCell>

          <Table.HeaderCell>ETA</Table.HeaderCell>
          <Table.HeaderCell>Remaining</Table.HeaderCell>
          <Table.HeaderCell>Speed</Table.HeaderCell>
          <Table.HeaderCell>Transferred</Table.HeaderCell>
          <Table.HeaderCell>Completed</Table.HeaderCell>
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
              <Table.Cell>{task.data ? task.data.cloud : 'n/a'}</Table.Cell>
              <Table.Cell>
                <a
                  target="_blank"
                  href={task.data ? task.data.meta.url : '#'}
                  title={task.data ? task.data.meta.url : '#'}
                >
                  url
                </a>
              </Table.Cell>

              <Table.Cell>
                {distance_in_words_to_now(task.created_at)}
                <br />
                <small>{format(task.created_at, 'MM/DD/YYYY h:mm:s')}</small>
              </Table.Cell>

              <Table.Cell>
                {task.progress ? task.progress.eta : 'n/a'}
              </Table.Cell>
              <Table.Cell>
                {task.progress ? task.progress.remaining : 'n/a'}
              </Table.Cell>
              <Table.Cell>
                {task.progress ? task.progress.speed : 'n/a'}
              </Table.Cell>
              <Table.Cell>
                {task.progress ? task.progress.transferred : 'n/a'}
              </Table.Cell>
              <Table.Cell>
                {task.progress ? task.progress.percentage : 'n/a'}
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table>
  </div>
);
