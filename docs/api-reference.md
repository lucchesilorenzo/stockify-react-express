## Products

#### Get all products

```bash
  GET /api/products
```

| Access | Protected |
| :----- | :-------- |

#### Get products to restock

```bash
  GET /api/products/to-restock
```

| Access | Protected |
| :----- | :-------- |

#### Get available products

```bash
  GET /api/products/available
```

| Access | Protected |
| :----- | :-------- |

#### Get product by slug

```bash
  GET /api/products/slug/:slug
```

| Parameter | Type     | Description                                 |
| :-------- | :------- | :------------------------------------------ |
| `slug`    | `string` | **Required**. Slug of the product to fetch. |

| Access | Protected |
| :----- | :-------- |

#### Update product

```bash
  PATCH /api/products/:productId
```

| Parameter   | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `productId` | `string` | **Required**. ID of the product to fetch. |

| Access | Protected |
| :----- | :-------- |

```json
{
  "description": "This is a description of the product.",
  "price": 19.99,
  "maxQuantity": 50,
  "categoryId": "cm466uu4g0004xb6j2bsutwhs",
  "image": "/uploads/image.jpg",
  "warehouseId": "cm466u9a50002xb6jxmkay7yk"
}
```

#### Update product status

```bash
  PATCH /api/products/:productId/status
```

| Parameter   | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `productId` | `string` | **Required**. ID of the product to fetch. |

| Access | Protected |
| :----- | :-------- |

```json
{
  "status": "ARCHIVED"
}
```

## Orders

#### Get all orders

```bash
  GET /api/orders
```

| Access | Protected |
| :----- | :-------- |

#### Get monthly orders

```bash
  GET /api/orders/monthly
```

| Access | Protected |
| :----- | :-------- |

#### Get weekly orders

```bash
  GET /api/orders/weekly
```

| Access | Protected |
| :----- | :-------- |

#### Create order

```bash
  POST /api/orders
```

| Access | Protected |
| :----- | :-------- |

```json
{
  "name": "Product Name",
  "categoryId": "cm46y31by00klxphwkjsi04cy",
  "vatRate": "22",
  "warehouseId": "cm46y31c500knxphw3o3afzch",
  "supplierId": "cm46wpikg004rxphwwlllywt5",
  "price": 999.99,
  "quantity": 20,
  "maxQuantity": 100
}
```

#### Create restock order

```bash
  POST /api/orders/restock
```

| Access | Protected |
| :----- | :-------- |

```json
{
  "productId": "cm46y31by00klxphwkjsi04cy",
  "supplierId": "cm46wpikg004rxphwwlllywt5",
  "quantity": 20
}
```

#### Update order status

```bash
  PATCH /api/orders/:orderId/status
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `orderId` | `string` | **Required**. ID of the order to fetch. |

| Access | Protected |
| :----- | :-------- |

## Tasks

#### Get all tasks

```bash
  GET /api/tasks
```

| Access | Protected |
| :----- | :-------- |

#### Create task

```bash
  POST /api/tasks
```

| Access | Protected |
| :----- | :-------- |

```json
{
  "title": "Organize Inventory",
  "status": "TO_DO",
  "priority": "HIGH",
  "label": "INVENTORY",
  "dueDate": "2024-11-30T09:00:00",
  "userId": "cm466qyf100004ov2f62p5gm6"
}
```

#### Generate tasks

```bash
  POST /api/tasks/generate
```

| Access | Protected |
| :----- | :-------- |

```json
{
  "prompt": "Generate a list of tasks for the week.",
  "numTasks": 5
}
```

#### Update task

```bash
  PATCH /api/tasks/:taskId
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `taskId`  | `string` | **Required**. ID of the task to fetch. |

| Access | Protected |
| :----- | :-------- |

```json
{
  "title": "Organize Inventory",
  "dueDate": "2024-11-30T09:00:00"
}
```

#### Update task field

```bash
  PATCH /api/tasks/:taskId/field
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `taskId`  | `string` | **Required**. ID of the task to fetch. |

| Access | Protected |
| :----- | :-------- |

```json
{
  "field": "status",
  "value": "IN_PROGRESS"
}
```

#### Delete task

```bash
  DELETE /api/tasks/:taskId
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `taskId`  | `string` | **Required**. ID of the task to fetch. |

| Access | Protected |
| :----- | :-------- |

## Suppliers

#### Get all suppliers

```bash
  GET /api/suppliers
```

| Access | Protected |
| :----- | :-------- |

#### Create supplier

```bash
  POST /api/suppliers
```

| Access | Protected |
| :----- | :-------- |

```json
{
  "name": "Acme Supplies",
  "email": "contact@acmesupplies.com",
  "phone": "+123456789",
  "address": "456 Industrial Ave",
  "city": "New York",
  "zipCode": "10001",
  "website": "https://www.acmesupplies.com"
}
```

#### Update supplier rating

```bash
  PATCH /api/suppliers/:supplierId/rating
```

| Parameter    | Type     | Description                                |
| :----------- | :------- | :----------------------------------------- |
| `supplierId` | `string` | **Required**. ID of the supplier to fetch. |

| Access | Protected |
| :----- | :-------- |

```json
{
  "rating": 3
}
```

## Customers

#### Get all customers

```bash
  GET /api/customers
```

| Access | Protected |
| :----- | :-------- |

#### Create customer shipment

```bash
  POST /api/customers/shipment
```

| Access | Protected |
| :----- | :-------- |

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "phone": "+123456789",
  "address": "123 Main St",
  "city": "New York",
  "zipCode": "10001",
  "products": [
    {
      "productId": "cm46y31by00klxphwkjsi04cy",
      "warehouseId": "cm46y31c500knxphw3o3afzch",
      "name": "Product Name",
      "price": 100.0,
      "quantity": 10
    }
  ]
}
```

#### Update customer

```bash
  PATCH /api/customers/:customerId
```

| Parameter    | Type     | Description                                |
| :----------- | :------- | :----------------------------------------- |
| `customerId` | `string` | **Required**. ID of the customer to fetch. |

| Access | Protected |
| :----- | :-------- |

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "phone": "+123456789",
  "address": "123 Main St",
  "city": "New York",
  "zipCode": "10001"
}
```

## Warehouses

#### Get all warehouses

```bash
  GET /api/warehouses
```

| Access | Protected |
| :----- | :-------- |

## Dashboard

#### Get inventory value

```bash
  GET /api/dashboard/inventory-value
```

| Access | Protected |
| :----- | :-------- |

#### Get low stock products

```bash
  GET /api/dashboard/low-stock-products
```

| Access | Protected |
| :----- | :-------- |

#### Get shipped orders

```bash
  GET /api/dashboard/shipped-orders
```

| Access | Protected |
| :----- | :-------- |

#### Get units in stock

```bash
  GET /api/dashboard/units-in-stock
```

| Access | Protected |
| :----- | :-------- |

#### Get activities

```bash
  GET /api/dashboard/activities
```

| Access | Protected |
| :----- | :-------- |

## Categories

#### Get all categories

```bash
  GET /api/categories
```

| Access | Protected |
| :----- | :-------- |

## Analytics

#### Get products by category

```bash
  GET /api/analytics/products-by-category
```

| Access | Protected |
| :----- | :-------- |

#### Get monthly inventory values

```bash
  GET /api/analytics/monthly-inventory-values
```

| Access | Protected |
| :----- | :-------- |

#### Get top products

```bash
  GET /api/analytics/top-products
```

| Access | Protected |
| :----- | :-------- |

## Settings

#### Get user settings

```bash
  GET /api/settings
```

| Access | Protected |
| :----- | :-------- |

#### Update user settings

```bash
  PATCH /api/settings
```

| Access | Protected |
| :----- | :-------- |

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-01",
  "bio": "I am a software developer with a passion for technology and innovation.",
  "phone": "+123456789",
  "address": "123 Main St",
  "city": "New York",
  "zipCode": "10001"
}
```

## Authentication

#### Sign up

```bash
  POST /api/auth/signup
```

| Access | Public |
| :----- | :----- |

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

#### Log in

```bash
  POST /api/auth/login
```

| Access | Public |
| :----- | :----- |

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
