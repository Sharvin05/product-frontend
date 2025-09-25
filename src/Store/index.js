const USER_INFO_KEY = 'UserInfo';

const Store = {
  setUserInfo(userInfo) {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
    }
  },
  getUserInfo() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = window.localStorage.getItem(USER_INFO_KEY);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },
  deleteUserInfo() {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(USER_INFO_KEY);
    }
  }
};

export default Store;
