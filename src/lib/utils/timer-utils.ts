export function getMinutes(t: number) {
  return Math.floor(t / (60 * 10));
}

export function getSeconds(t: number) {
  return Math.floor((t - getMinutes(t) * (60 * 10)) / 10);
}

export function formatTimeString(time: number) {
  return (
    `${String(getMinutes(time)).padStart(2, '0')}:${String(getSeconds(time)).padStart(2, '0')}`
  );
}

export function formatTime(categoryDuration: number) {
  return (time: number | null, goldenScore: boolean | null) => {
    if (time === null) {
      return '-';
    }

    if (goldenScore) {
      return `${formatTimeString(time)} (GS)`;
    }

    const notGoldenScoreTime = categoryDuration - time;
    return formatTimeString(notGoldenScoreTime);
  };
}
