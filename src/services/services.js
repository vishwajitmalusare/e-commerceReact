import { ENDPOINTS } from "../config/configure";
import { client } from "./Axios";
import { store } from "../store";

const token = store.getState().auth.token;
console.log(token);
// const token = localStorage.getItem("Token");

export const login = (data) => {
  return client
    .post(ENDPOINTS.Login, data, {
      headers: {},
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const signup = (formData) => {
  return client
    .post(ENDPOINTS.Signup, formData, {
      headers: {},
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const signupWithProfile = (data) => {
  return client
    .post(ENDPOINTS.SignupWithProfile, data, {
      headers: {},
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const createCategory = (data) => {
  return client
    .post(ENDPOINTS.CreateCategory, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getAllCategories = () => {
  return client
    .get(ENDPOINTS.GetAllCategories, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const deleteCategory = (data) => {
  return client
    .delete(ENDPOINTS.DeleteCategory + data.id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const updateCategory = (formdata, dataId) => {
  return client
    .put(ENDPOINTS.UpdateCategory + dataId.id.id, formdata, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getCategory = (data) => {
  return client
    .get(ENDPOINTS.GetCategory + data.id.id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getAllProducts = () => {
  return client
    .get(ENDPOINTS.GetAllProducts, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getProductPagination = (data) => {
  return client
    .get(
      ENDPOINTS.GetProductPagination +
        "?pageNo=" +
        data.pageNo +
        "&pageSize=" +
        data.pageSize,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const createProduct = (data) => {
  return client
    .post(ENDPOINTS.CreateProduct, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const deleteProduct = (data) => {
  return client
    .delete(ENDPOINTS.DeleteProduct + data.id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const updateProduct = (formdata, dataId) => {
  return client
    .put(ENDPOINTS.UpdateProduct + dataId.id, formdata, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const filterByCategory = (data) => {
  return client
    .get(ENDPOINTS.FilterByCategory + data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getProduct = (data) => {
  return client
    .get(ENDPOINTS.GetProduct + data.id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const searchProducts = (data) => {
  return client
    .get(ENDPOINTS.SearchProducts + "" + data.searchquery, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const addToCart = (data) => {
  return client
    .post(ENDPOINTS.AddToCart, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getCartItems = async () => {
  try {
    return await client.get(ENDPOINTS.GetCartItems, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const placeOrder = (data) => {
  return client
    .post(ENDPOINTS.PlaceOrder, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getOrders = (data) => {
  return client
    .get(ENDPOINTS.GetOrders, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getOrdersByUserId = () => {
  return client
    .get(ENDPOINTS.GetOrderByUserId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getOrdersById = (data) => {
  return client
    .get(ENDPOINTS.GetOrderById + "" + data.id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const deleteAllCarts = (data) => {
  return client
    .get(ENDPOINTS.DeleteAllCarts + "" + data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteCartByProdId = (data) => {
  return client
    .get(ENDPOINTS.DeletCartByProdId + "" + data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const getOrderByUserIdAndId = (data) => {
  return client
    .get(ENDPOINTS.getOrderById + data.id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const updateOrder = (data) => {
  return client
    .put(
      ENDPOINTS.UpdateOrder +
        data.id +
        "?status=" +
        data.status +
        "&remark=" +
        data.remark,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const filterOrder = (data) => {
  return client
    .post(ENDPOINTS.FilterOrder, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
