import moment from 'moment';

const convertDate = (date: string) => {
  return moment(date).format('ddd, DD MMM HH.ss');
};

export default convertDate;
