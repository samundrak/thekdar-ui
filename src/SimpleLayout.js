import React from 'react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Container, Grid, Image, Menu } from 'semantic-ui-react';

export default props => (
  <Container>
    <Menu inverted>
      <Menu.Item>
        <Link to="/">Thekdar UI</Link>
      </Menu.Item>
    </Menu>
    <Grid>
      <Grid.Column width={4}>
        <Menu inverted pointing vertical>
          <Menu.Item>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/workers">Workers</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/tasks">Tasks</Link>
          </Menu.Item>
        </Menu>{' '}
      </Grid.Column>
      <Grid.Column width={12}>
        <Container
          fluid
          style={{ border: '1px solid', borderRadius: '20px', padding: '50px' }}
        >
          {props.children}
        </Container>
      </Grid.Column>
    </Grid>
  </Container>
);
