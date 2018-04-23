import React from 'react';
import { Header, Icon, Label, Menu, Table } from 'semantic-ui-react';
import distance_in_words_to_now from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';

function getNumberOfTasks(tasks = [], workerId) {
  return (
    tasks.filter(task => {
      return task._workerId === workerId;
    }) || []
  );
}
const WorkerTable = ({ workers, tasks }) => (
  <div>
    <Header as="h3" block>
      Workers ({workers.length})
    </Header>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Tasks</Table.HeaderCell>
          <Table.HeaderCell>Process ID</Table.HeaderCell>
          <Table.HeaderCell>Crashes</Table.HeaderCell>
          <Table.HeaderCell>Created At</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {workers.map((worker, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              {worker._worker.status === 'running' ? (
                <Icon name="circle" color="green" />
              ) : (
                <Icon name="circle" color="red" />
              )}
            </Table.Cell>
            <Table.Cell>{worker._id}</Table.Cell>
            <Table.Cell>{worker._type}</Table.Cell>
            <Table.Cell>
              {getNumberOfTasks(tasks, worker._id).length}
            </Table.Cell>
            <Table.Cell>{worker._worker.pid}</Table.Cell>
            <Table.Cell>{worker._worker.crashes}</Table.Cell>
            <Table.Cell>
              {distance_in_words_to_now(worker.created_at)}
              <br />
              <small>{format(worker.created_at, 'MM/DD/YYYY h:mm:s')}</small>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);
export default WorkerTable;
