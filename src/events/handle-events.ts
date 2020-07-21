import ConnectionEvent from './connection-event.dao'

export const saveEvent = async ({ type, name}) => {
  const event = ConnectionEvent.build({ type, name });
  await event.save();
};