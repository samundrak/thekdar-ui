import React from 'react';
import { List, Label } from 'semantic-ui-react';
import flat from 'flat';

export default ({ object }) => {
  const flatObj = flat(object || {});
  return (
    <List divided selection>
      {Object.keys(flatObj).map((key, index) => (
        <List.Item key={index}>
          <Label horizontal>{key}</Label>
          {JSON.stringify(flatObj[key])}
        </List.Item>
      ))}
    </List>
  );
};
