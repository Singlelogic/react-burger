export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'created':
      return 'Создан';
    case 'pending':
      return 'Готовится';
    case 'done':
      return 'Выполнен';
    default:
      return 'unknown';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return '#00CCCC';
    default:
      return '';
  }
};
