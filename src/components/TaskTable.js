import React from 'react';
import { Header, Icon, Label, Menu, Table } from 'semantic-ui-react';
import distance_in_words_to_now from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';

export default ({ tasks }) => (
  <div>
    <Header as="h3" block>
      Tasks ({tasks.length})
    </Header>
    <Table celled>
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
              <Table.Cell>{task.id}</Table.Cell>
              <Table.Cell>{task.type}</Table.Cell>
              <Table.Cell>{task._workerId}</Table.Cell>
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
