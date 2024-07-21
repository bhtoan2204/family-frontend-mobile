export const handleRestore = async () => {
  await Promise.resolve(
    new Promise(resolve => {
      setTimeout(() => {
        resolve('1');
      }, 100);
    }),
  );
};
