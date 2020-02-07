export const promiseQueue = () => {
  let tail: Promise<any> | null = null;
  return (task: () => Promise<any>) => {
    tail = tail?.finally(task) ?? task();
  };
};
