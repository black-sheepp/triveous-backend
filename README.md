### Ecommerce API with Node js

#### Description:

This project implements a RESTful API for an online shopping platform. It allows users to register, login, view products, add products to cart, place orders, and manage their orders.

#### Installation:

1. Clone the repository:
     ```
     git clone https://github.com/black-sheepp/triveous-backend.git
     ```
2. Navigate to the project directory:
     ```
     cd triveous-backend
     ```
3. Install dependencies:
     ```
     npm install
     ```
4. Set up environment variables:
     - Create a `.env` file in the root directory.
     - Define the following environment variables:
          ```
          PORT=8000
          MONGODB_URL=<your_mongodb_connection_string>
          JWT_SECRET=<your_jwt_secret_key>
          ```
5. Start the server:
     ```
     npm start
     ```

#### API Endpoints:

-    User Authentication:

     -    `POST /register`: Create a new user account.
     -    `POST /login`: Authenticate user and generate authentication token.
     -    `GET /logout`: Logout the user.

-    Product Management:

     -    `POST /create-category`: Create a new product category.
     -    `POST /create-product`: Create a new product.
     -    `GET /get-productListBycategory/:categoryId`: Get a list of products by category ID.
     -    `GET /get-product/:productId`: Get details of a specific product by its ID.

-    Cart Management:

     -    `POST /add-to-cart`: Add a product to the user's cart.
     -    `GET /view-cart`: View the user's cart.
     -    `PUT /update-cart-items/:itemId`: Update the quantity of a product in the user's cart.
     -    `DELETE /remove-cart-items/:itemId`: Remove a product from the user's cart.

-    Order Management:
     -    `GET /place-order`: Place an order using the products in the user's cart.
     -    `GET /order-history`: Get the order history for the authenticated user.
     -    `GET /order-details/:orderId`: Get detailed information of a specific order by its ID.

#### Testing:

To test the API endpoints, you can use tools like Postman or write unit tests using libraries like Mocha and Chai.

### API Endpoint Test Cases

#### 1. User Authentication:

-    **Register User**

     -    Method: POST
     -    Endpoint: /register
     -    Test Case:
          -    Input:
               ```
               {
                 "username": "Shivam Gupta",
                 "email": "shivam@github.com",
                 "password": "test123",
                 "phone": "1234567890",
                 "address": "New Delhi, India"
               }
               ```
          -    Expected Output:
               -    Status Code: 200
               -    Response Body:
                    ```
                    {
                      "username": "Shivam Gupta",
                      "email": "shivam@github.com",
                      "phone": "1234567890",
                      "address": "New Delhi, India",
                      "role": "user",
                      "token": "<authentication_token>"
                    }
                    ```

-    **Login User**

     -    Method: POST
     -    Endpoint: /login
     -    Test Case:
          -    Input:
               ```
               {
                 "email": "shivam@github.com",
                 "password": "test123"
               }
               ```
          -    Expected Output:
               -    Status Code: 200
               -    Response Body:
                    ```
                    {
                      "username": "Shivam Gupta",
                      "email": "shivam@github.com",
                      "phone": "1234567890",
                      "address": "New Delhi, India",
                      "token": "<authentication_token>"
                    }
                    ```

-    **Logout User**
     -    Method: GET
     -    Endpoint: /logout
     -    Test Case:
          -    Expected Output:
               -    Status Code: 200
               -    Response Body:
                    ```
                    {
                      "message": "User logged out successfully"
                    }
                    ```

#### 2. Product Management:

-    **Create Product Category**

     -    Method: POST
     -    Endpoint: /create-category
     -    Test Case:
          -    Input:
               ```
               {
                 "name": "Electronics"
               }
               ```
          -    Expected Output:
               -    Status Code: 201
               -    Response Body:
                    ```
                    {
                      "message": "Category created successfully",
                      "category": {
                        "_id": "<category_id>",
                        "name": "Electronics",
                        "createdAt": "<timestamp>",
                        "updatedAt": "<timestamp>",
                        "__v": 0
                      }
                    }
                    ```

-    **Create Product**

     -    Method: POST
     -    Endpoint: /create-product
     -    Test Case:
          -    Input:
               ```
               {
                 "title": "Laptop",
                 "price": 1000,
                 "description": "High-performance laptop",
                 "category": "<category_id>"
               }
               ```
          -    Expected Output:
               -    Status Code: 201
               -    Response Body:
                    ```
                    {
                      "message": "Product created successfully",
                      "product": {
                        "_id": "<product_id>",
                        "title": "Laptop",
                        "price": 1000,
                        "description": "High-performance laptop",
                        "availability": true,
                        "category": "<category_id>",
                        "createdAt": "<timestamp>",
                        "updatedAt": "<timestamp>",
                        "__v": 0
                      }
                    }
                    ```

-    **Get Products By Category ID**

     -    Method: GET
     -    Endpoint: /get-productListBycategory/:categoryId
     -    Test Case:
          -    Input: categoryId
          -    Expected Output:
               -    Status Code: 200
               -    Response Body:
                    ```
                    [
                      {
                        "_id": "<product_id>",
                        "title": "Laptop",
                        "price": 1000,
                        "description": "High-performance laptop",
                        "availability": true
                      }
                    ]
                    ```

-    **Get Product By ID**
     -    Method: GET
     -    Endpoint: /get-product/:productId
     -    Test Case:
          -    Input: productId
          -    Expected Output:
               -    Status Code: 200
               -    Response Body:
                    ```
                    {
                      "_id": "<product_id>",
                      "title": "Laptop",
                      "price": 1000,
                      "description": "High-performance laptop",
                      "availability": true
                    }
                    ```

#### 3. Cart Management:

-    **Add Product to Cart**

     -    Method: POST
     -    Endpoint: /add-to-cart
     -    Test Case:
          -    Input:
               ```
               {
                 "productId": "<product_id>",
                 "quantity": 1
               }
               ```
          -    Expected Output:
               -    Status Code: 200
               -    Response Body:
                    ```
                    {
                      "message": "Product added to cart successfully"
                    }
                    ```

-    **View Cart**
     -    Method: GET
     -    Endpoint: /view-cart
     -    Test Case:
          -    Expected Output:
               -    Status Code: 200
               -    Response Body:
                    ```
                    {
                      "message": "Cart retrieved successfully",
                      "cart
                    ```

": [
{
"product": {
"title": "Laptop",
"price": 1000,
"description": "High-performance laptop"
},
"quantity": 1
}
]
}
```

-    **Update Cart Item**

     -    Method: PUT
     -    Endpoint: /update-cart-items/:itemId
     -    Test Case:
          -    Input: itemId, updated quantity
          -    Expected Output:
               -    Status Code: 200
               -    Response Body:
                    ```
                    {
                      "message": "Cart item updated successfully"
                    }
                    ```

-    **Remove Cart Item**
     -    Method: DELETE
     -    Endpoint: /remove-cart-items/:itemId
     -    Test Case:
          -    Input: itemId
          -    Expected Output:
               -    Status Code: 200
               -    Response Body:
                    ```
                    {
                      "message": "Cart item removed successfully"
                    }
                    ```

#### 4. Order Management:

-    **Place Order**

     -    Method: GET
     -    Endpoint: /place-order
     -    Test Case:
          -    Expected Output:
               -    Status Code: 200
               -    Response Body:
                    ```
                    {
                      "message": "Order placed successfully",
                      "order": {
                        "_id": "<order_id>",
                        "user": "<user_id>",
                        "items": [
                          {
                            "product": "<product_id>",
                            "quantity": 1
                          }
                        ],
                        "createdAt": "<timestamp>",
                        "updatedAt": "<timestamp>",
                        "__v": 1
                      }
                    }
                    ```

-    **Get Order History**

     -    Method: GET
     -    Endpoint: /order-history
     -    Test Case:
          -    Expected Output:
               -    Status Code: 200
               -    Response Body:
                    ```
                    {
                      "message": "Order history retrieved successfully",
                      "orders": [
                        {
                          "_id": "<order_id>",
                          "user": "<user_id>",
                          "items": [
                            {
                              "product": "<product_id>",
                              "quantity": 1
                            }
                          ],
                          "createdAt": "<timestamp>",
                          "updatedAt": "<timestamp>",
                          "__v": 1
                        }
                      ]
                    }
                    ```

-    **Get Order Details**
     -    Method: GET
     -    Endpoint: /order-details/:orderId
     -    Test Case:
          -    Input: orderId
          -    Expected Output:
               -    Status Code: 200
               -    Response Body:
                    ```
                    {
                      "message": "Order details retrieved successfully",
                      "order": {
                        "_id": "<order_id>",
                        "user": "<user_id>",
                        "items": [
                          {
                            "product": "<product_id>",
                            "quantity": 1
                          }
                        ],
                        "createdAt": "<timestamp>",
                        "updatedAt": "<timestamp>",
                        "__v": 1
                      }
                    }
                    ```
