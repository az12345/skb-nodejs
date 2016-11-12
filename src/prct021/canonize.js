import _ from 'lodash';

export default function canonize(url) {
  const urlSafe = _.toString(url);
  const re = new RegExp('@?(https?:)?(//)?((telegram|vk|vkontakte)[^/]*/)?([a-zA-Z0-9]*)', 'i');
  const username = urlSafe.match(re)[5];

  return `@${username}`;
}
