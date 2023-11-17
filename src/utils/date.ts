export function formatDate(date: string) {
  const currentDate = new Date();
  const targetDate = new Date(date);
  const hours = ("0" + targetDate.getHours()).slice(-2);
  const minutes = ("0" + targetDate.getMinutes()).slice(-2);
  const timezone = `i-GMT+${-targetDate.getTimezoneOffset() / 60}`;
  const dayAgo = getDayAgoString(currentDate, targetDate);

  return `${dayAgo}, ${hours}:${minutes} ${timezone}`;
}

export function getDayAgoString(sourceDate: Date, targetDate: Date) {
  const diffDay = sourceDate.getDay() - targetDate.getDay();
  const excludeDays = [11, 12, 13, 14];

  switch (true) {
    case (diffDay === 0): {
      return 'Сегодня';
    }
    case (diffDay === 1): {
      return 'Вчера';
    }
    case ((diffDay > 9) && (diffDay % 10 === 1) && (!excludeDays.includes(diffDay))): {
      return `${diffDay} день назад`;
    }
    case ((diffDay % 10 > 1) && (diffDay % 10 < 5) && (!excludeDays.includes(diffDay))): {
      return `${diffDay} дня назад`;
    }
    default: {
      return `${diffDay} дней назад`;
    }
  }
}
