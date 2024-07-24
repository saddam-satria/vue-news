import NewsReadService from '@/news/read/news-read.service';

const NavbarDatasource = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Lanjutkan Membaca',
    url: NewsReadService.routePath,
  },
];

export default NavbarDatasource;
