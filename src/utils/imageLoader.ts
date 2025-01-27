export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (srcs: string[]): Promise<void[]> => {
  const promises = srcs.map(src => preloadImage(src));
  return Promise.allSettled(promises).then(results => {
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.warn(`Failed to preload image: ${srcs[index]}`);
      }
    });
  });
};