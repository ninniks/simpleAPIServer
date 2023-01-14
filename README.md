
# SimpleAPIServer

A simple NodeJS API Server with Sequelize ORM




## API Reference

#### Get all Users

```http
  GET /api/user/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `none` | none |

#### Create new User

```http
  POST /api/user/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `firstName`      | `string` | **Required**. User first name |
| `lastName`      | `string` | **Required**. User last name |
| `username`      | `string` | **Required** |
| `password`      | `string` | **Required**. User first name |
| `email`      | `string` | **Required**. User first name |

#### Login

Returns a JWT Token for Authentication 
```http
  POST /api/login/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required** |
| `password`      | `string` | **Required**. User first name |


