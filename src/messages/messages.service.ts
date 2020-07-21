import Message from "./message.dao";

export const getLastMessages = async () => {
  const last10Messages = await Message.findAll({
    limit: 10,
    order: [['createdAt', 'ASC']]
  });

  return last10Messages;
}


export const saveMessage: any = async ({ from, content }) => {

  const message = await Message.create(
    {
      from,
      content
    }
  );

  return message.toJSON();
}