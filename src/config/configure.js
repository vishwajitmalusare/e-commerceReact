export const configure ={
    // BASE_URL: 'http://172.22.28.153:8080/api/',
    IMAGE_BASE_URL: 'http://localhost:8080/api/v1/auth/displayImage/',
    BASE_URL: 'http://localhost:8080/api/'

}

export const ENDPOINTS = {
    Login:'v1/auth/login',
    Signup:'v1/auth/register',
    SignupWithProfile: 'users/addUser',

    CreateCategory:'category/create',
    GetAllCategories: 'category',
    DeleteCategory: 'category/',
    UpdateCategory: 'category/',
    GetCategory:'category/',

    GetAllProducts:'products',
    GetProductPagination:'products/pagination',
    CreateProduct:'products/create-product',
    DeleteProduct:'products/',
    UpdateProduct:'products/',
    GetProduct:'products/',

    FilterByCategory:'products/filter/',
    SearchProducts:'products/search?query=',

    AddToCart:'cart/save',
    GetCartItems:'cart',
    DeleteAllCarts:'cart/deleteByUserId/',
    DeletCartByProdId:'cart/deleteByProdId/',

    PlaceOrder:'order/placeOrder',
    GetOrders:'order/getAllOrder',
    SendEmail:'sendmail',
    SendEmailWithAttachment:'sendemailwithattachment',
    GetOrderByUserId:'order/getAllOrder',
    GetOrderById:'order/invoice/',
    UpdateOrder:'order/update/',
    FilterOrder: 'order/filter'
    }
