import React from 'react';
import { Header, Card, Feed, Icon, Segment } from 'semantic-ui-react';

export default ({ feeds }) => (
  <Segment>
    <Header as="h4">Recent Activity</Header>
    <Feed>
      {feeds.map((feed, index) => (
        <Feed.Event key={index}>
          <Feed.Label>
            <Icon name={feed.type} />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              {feed.message}
              <Feed.Date>{feed.time}</Feed.Date>
              <hr />
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      ))}
    </Feed>
  </Segment>
);
