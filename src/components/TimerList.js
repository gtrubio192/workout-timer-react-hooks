import React from 'react';
import { ListItem } from './ListItem';

export const TimerList = ({list}) => {
    return (
      <div>
        {
          list.map(item => (
            <ListItem itemDetails={item} />
          ))
        }
      </div>
    );
}