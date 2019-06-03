/* eslint-disable import/prefer-default-export */

export const mergeRefs = (...refs) => incomingRef =>
  refs.forEach(ref => {
    if (typeof ref === 'function') {
      ref(incomingRef);
    } else {
      // eslint-disable-next-line no-param-reassign
      ref.current = incomingRef;
    }
  });
