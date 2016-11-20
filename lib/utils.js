const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const OFFSET = new Date().getTimezoneOffset() / 60;

export const formatDate = function(dateString) {
  const d = new Date(`${dateString}T00:00:00-0${OFFSET}:00`);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export const getPostUrl = (post) => `/blog/${post.slug}`;
