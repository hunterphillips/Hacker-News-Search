export const isDayTime = () => {
  const currentTime = new Date().toLocaleTimeString();
  const hr = Number(currentTime.split(':')[0]);
  const tod = currentTime.split(' ')[1];
  return (
    (tod === 'AM' && hr >= 7 && hr < 12) ||
    (tod === 'PM' && (hr < 8 || hr === 12))
  );
};
