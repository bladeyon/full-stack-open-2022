const info = (...params) => {
  console.log(...params);
};
const error = (...params) => {
  console.error(
    '%cSystem Error: ',
    'color: red; font-weight: bolder',
    ...params
  );
};

module.exports = {
  info,
  error
};
