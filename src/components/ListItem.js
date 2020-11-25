import React from 'react'

export const ListItem = ({itemDetails}) => {
    return (
      <div>
        {itemDetails.name} - {itemDetails.time}
      </div>
    );
}