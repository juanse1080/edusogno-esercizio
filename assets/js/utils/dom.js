const loadState = (key) => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return undefined;

    return JSON.parse(value);
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

const saveState = (key, state) => {
  try {
    if (state === undefined || state === null) {
      localStorage.removeItem(key);
    } else {
      const serialState = JSON.stringify(state);
      localStorage.setItem(key, serialState);
    }
  } catch (err) {
    console.error(err);
  }
};

const removeState = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
};

const push = (url, state = {}) => {
  window.location = url;
};

const replace = (url, state = {}) => {
  window.location.replace(url);
};
