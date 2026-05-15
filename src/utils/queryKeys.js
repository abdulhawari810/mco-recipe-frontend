export const recipeKeys = {
  all: (params = {}) => ["recipes", params],

  list: (params = {}) => ["recipes", "list", params],

  detail: (id) => ["recipes", "detail", id],

  byAuthor: (authorId) => ["recipes", "author", authorId],

  admin: (params = {}) => ["recipes", "admin", params],

  countStatusAll: () => ["recipes", "count-status-all"],
  countStatusChef: () => ["recipes", "count-status-chef"],
  recipesByAuthor: (params = {}) => ["recipesByAuthor", params],
};

export const AuthKeys = {
  all: (params = {}) => ["auth", params],
  register: (params = {}) => ["auth", "register", params],
  login: (params = {}) => ["auth", "login", params],
};
