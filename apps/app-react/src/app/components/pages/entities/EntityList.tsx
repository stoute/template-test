import * as React from 'react';
import TripListItem from '../../common/TripListItem';

const EntityList = ({ entities, onSelect, type }) => {
  return (
    <ul className={'list-group'}>
      {entities.map((item) => {
        return (
          <li
            className="list-group-item"
            key={item.id}
            onClick={() => {
              onSelect(item.id);
            }}
          >
            {type === 'trip' && <TripListItem data={item}></TripListItem>}
          </li>
        );
      })}
    </ul>
  );
};

export default EntityList;
