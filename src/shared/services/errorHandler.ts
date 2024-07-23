const httpErrorHandler = (message: string) => {
  const statusCodes = new Map();

  statusCodes.set('429', 'permintaan terlalu banyak, coba lagi nanti');
  statusCodes.set('400', 'terdapat kesalahan pada permintaan anda');
  statusCodes.set('401', 'akses memerlukan token, silahkan hubungi developer');
  statusCodes.set('403', 'akses ditolak, silahkan hubungi developer');
  statusCodes.set('404', 'data tidak ditemukan');
  statusCodes.set('500', 'terjadi kesalahan pada server, silahkan hubungi developer');

  const pattern = /(\d+)/;

  const statusCode = message.match(pattern);

  console.log(statusCode);

  if (statusCode) {
    if (statusCodes.has(statusCode[0])) {
      return statusCodes.get(statusCode[0]);
    }
  }

  return statusCodes.get('400');
};

export default httpErrorHandler;
