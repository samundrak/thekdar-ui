import React from 'react';
import { Card, Feed } from 'semantic-ui-react';

export default ({ feeds }) => (
  <Card fluid={true}>
    <Card.Content>
      <Card.Header>Recent Activity</Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed>
        {feeds.map((feed, index) => (
          <Feed.Event key={index}>
            <Feed.Content>
              <Feed.Date content={feed.time} />
              <Feed.Summary>
                {feed.message}
                <hr />
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        ))}
      </Feed>
    </Card.Content>
  </Card>
);
