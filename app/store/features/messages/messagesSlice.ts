/* eslint-disable import/prefer-default-export */
import { schema } from 'normalizr';

export const messageEntity = new schema.Entity(
  'messages',
  {},
  {
    idAttribute: 'item_id'
  }
);
