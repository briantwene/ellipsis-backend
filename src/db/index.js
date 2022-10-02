const { Pool } = require("pg");

const pool = new Pool();

const query = async (text, params) => {
  return pool.query(text, params);
};

const queryText = {
  getConversations: `select
  c.c_id,
  c_name,
  type,
  c.c_avatar,
  m.user_id,
  case type
  when 'S' then (
      select json_build_object('username', username,'avatar', avatar, 'user_id',user_id) from public.user as p where p.user_id != $1 and p.user_id in (
          select user_id from member where c_id = m.c_id
      )
  ) end 
  as userinfo
  from public.conversations as c
  inner join member as m 
  on c.c_id = m.c_id and user_id = $1`,
  addMessage:
    "INSERT INTO messages (sender, message_text, sent, c_id) VALUES ($1,$2, $3, $4)",
  deleteMessage: "DELETE FROM messages WHERE id = $1",
  getMessages:
    "select id, sender, message_text, sent, c_id, username, avatar from messages as m left join public.user as u on m.sender = u.user_id where c_id = $1",
  addMembers: `INSERT INTO member (user_id, c_id) VALUES ($1, $2)`,
  createConversation:
    "INSERT INTO conversations (c_name, type, c_avatar) VALUES ($1, $2, $3)",
  signIn: "SELECT * FROM public.user WHERE email = $1 ",
  signUp:
    "INSERT INTO public.user (email, username, password, avatar) VALUES ($1, $2, $3, $4)",
  getMe: "select username, avatar, user_id from public.user where user_id = $1",
  getConversation: `select
  c.c_id,
  c_name,
  type,
  c.c_avatar,
  m.user_id,
  case type
  when 'S' then (
      select json_build_object('username', username,'avatar', avatar, 'user_id',user_id) from public.user as p where p.user_id != $1 and p.user_id in (
          select user_id from member where c_id = m.c_id
      )
  ) end 
  as userinfo
  from public.conversations as c
  inner join member as m 
  on c.c_id = m.c_id and user_id = $1 and c.c_id = $2`,
  getMembers:
    "select m.user_id, u.username, u.avatar from member as m left join public.user as u on m.user_id = u.user_id where m.c_id = $1"
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  queryText
};
