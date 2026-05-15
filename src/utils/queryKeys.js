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

export const profileKeys = {
  all: (params = {}) => ["profile", params],
  create: (params = {}) => ["profile", "create", params],
  update: (params = {}) => ["profile", "update", params],
};

export const favouriteKeys = {
  all: (params = {}) => ["favourite", params],
  create: (params = {}) => ["favourite", "create", params],
  update: (params = {}) => ["favourite", "update", params],
};

export const categoriesKeys = {
  all: (params = {}) => ["categories", params],
  create: (params = {}) => ["categories", "create", params],
  update: (params = {}) => ["categories", "update", params],
};

export const usersKeys = {
  all: (params = {}) => ["users", params],
  single: (params = {}) => ["users", "single", params],
  create: (params = {}) => ["users", "create", params],
  update: (params = {}) => ["users", "update", params],
  status: (params = {}) => ["users", "status", params],
  delete: (params = {}) => ["users", "delete", params],
};
