import canonize from './canonize';

const array = [
'https://telegram.me/skillbranch',
'https://telegram.me/skillbranch123',
'hTTps://telegram.me/skiLLbrAnch',
'hTTps://telEGram.me/skillbranch',
'//telegram.me/skillbranch',
'http://telegram.me/skillbranch',
'telegram.me/skillbranch',
'skillbranch',
'@skillbranch',
'https://vk.com/skillbranch',
'https://www.vk.com/skillbranch',
'http://www.vk.com/skillbranch',
'http://vk.com/skillbranch',
'//vk.com/skillbranch',
'vk.com/skillbranch',
'vk.com/skillbranch?w=wall-11231424234_22',
'vk.com/skillbranch/profile',
];

array.forEach((url) => {
  const username = canonize(url);
  console.log(username[5]);
});
