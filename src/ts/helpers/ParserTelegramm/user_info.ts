import ICommit from 'ts/interfaces/Commit';

export default function getUserInfo(message: any): ICommit {
  /*
   "id": -999973047,
   "type": "message",
   "date": "2021-02-03T17:21:10",
   "date_unixtime": "1612362070",
   "from": "Дарья Скуратова (ВТБ)",
   "from_id": "user415945803",
   "text": "Ребята, привет!",
   "text_entities": [
    {
     "type": "plain",
     "text": "Ребята, привет!"
    }
   ]
  */

  const date = new Date(message?.date);
  const day = date.getDay() - 1;
  const timestamp = message?.date.split('T')[0];

  const author = message?.from || '';
  const email = message?.from_id || '';
  const text = Array.isArray(message?.text)
    ? message.text.map((subString: any) => subString?.text || subString).join(' ')
    : (message?.text || '');

  return {
    date: message?.date,
    day: day < 0 ? 6 : day,
    dayInMonth: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    month: date.getMonth(),
    year: date.getUTCFullYear(),
    week: 0,
    timestamp,
    milliseconds: parseInt(message?.date_unixtime, 10),

    author,
    email,
    message: text || '',

    task: 'беседа',
    taskNumber: '',
    type: 'не подписан',
    scope: 'неопределенна',

    changes: 0,
    added: 0,
    removed: 0,
  };
}