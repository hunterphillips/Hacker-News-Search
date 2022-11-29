export const isDayTime = () => {
  const currentTime = new Date().toLocaleTimeString();
  let hr = Number(currentTime.split(':')[0]);
  let tod = currentTime.split(' ')[1];
  return (
    (tod === 'AM' && hr >= 7 && hr < 12) ||
    (tod === 'PM' && (hr < 8 || hr === 12))
  );
};
