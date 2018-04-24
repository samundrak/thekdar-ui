import React from 'react';
import distance_in_words_to_now from 'date-fns/distance_in_words_to_now';
import { Header, Icon, Label, Menu, Table } from 'semantic-ui-react';
import format from 'date-fns/format';
import prettysize from 'prettysize';

export default ({ usage }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="3"> Usage</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell title="percentage (it may happen to be greater than 100%)">
            {' '}
            CPU
          </Table.HeaderCell>
          <Table.HeaderCell title="bytes">Memory</Table.HeaderCell>
          <Table.HeaderCell>PPID</Table.HeaderCell>
          <Table.HeaderCell>PID</Table.HeaderCell>
          <Table.HeaderCell title="ms user + system time">
            cTime
          </Table.HeaderCell>
          <Table.HeaderCell title="ms since the start of the process">
            Elapses
          </Table.HeaderCell>
          <Table.HeaderCell title="ms since epoch">timestamp</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {!usage ? (
          <Table.Row>
            <Table.Cell>Usage not available</Table.Cell>
          </Table.Row>
        ) : (
          <Table.Row>
            <Table.Cell>{usage.cpu}%</Table.Cell>
            <Table.Cell>{prettysize(usage.memory)}</Table.Cell>
            <Table.Cell>{usage.ppid}</Table.Cell>
            <Table.Cell>{usage.pid}</Table.Cell>
            <Table.Cell>
              {' '}
              {distance_in_words_to_now(Date.now() - usage.ctime)}
              <br />
              <small>
                {format(Date.now() - usage.ctime, 'MM/DD/YYYY h:mm:s')}
              </small>
            </Table.Cell>
            <Table.Cell>
              {' '}
              {distance_in_words_to_now(Date.now() - usage.elapsed)}
              <br />
              <small>
                {format(Date.now() - usage.elapsed, 'MM/DD/YYYY h:mm:s')}
              </small>
            </Table.Cell>
            <Table.Cell>
              {' '}
              {distance_in_words_to_now(usage.timestamp)}
              <br />
              <small>{format(usage.timestamp, 'MM/DD/YYYY h:mm:s')}</small>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
