//  Anikamtion
export const buttonVariant = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.07, 1],
    transition: {
      type: 'tween',
      duration: 2,
      repeat: 'Infinity',
    },
  },
};

export const containerVariant = {
  initial: {
    opacity: 0.6,
    scale: 0.7,
  },
  animate: {
    opacity: [0.6, 1],
    scale: [0.7, 1.05, 1],
    transition: {
      type: 'tween',
      duration: 1.8,
    },
    when: 'beforeChildren',
  },
};

export const inputVariant = {
  initial: {
    opacity: 0.6,
    y: '5vh',
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

export const chatTabVariant = {
  initial: {
    x: '5vw',
    overflow: 'hidden',
  },
  animate: {
    x: 0,
    overflow: 'hidden',
    transition: {
      type: 'tween',
    },
  },
};
