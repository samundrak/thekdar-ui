import React from 'react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Segment, Container, Grid, Image, Menu } from 'semantic-ui-react';

export default props => (
  <div>
    <Menu inverted borderless fixed="top">
      <Menu.Item>
        <Link to="/">Thekdar UI</Link>
      </Menu.Item>
    </Menu>
    <Grid container>
      <Grid.Column width={4}>
        <Segment>
          <Menu inverted pointing vertical fluid>
            <Menu.Item>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/workers">Workers</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/tasks">Tasks</Link>
            </Menu.Item>
          </Menu>
        </Segment>
      </Grid.Column>
      <Grid.Column width={12}>
        <Segment>{props.children}</Segment>
      </Grid.Column>
    </Grid>
  </div>
);
