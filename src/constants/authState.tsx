export const INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
  };
  
export const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    setUser: () => {},
    checkAuth: async () => false,
  };
  