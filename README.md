# User Management API

API to manage admins and users.

## API Reference

This is a small guide to get started using this API

#### NOTE

- A config.env file is provided to access the database using a guest user
- No need to change anything in config.env file.

#### Endpoints

- '/api/v1/users'
- '/api/v1/admin'

#### Steps

- Clone the repository in your local environment
- Use an api develepment software like Postman or Thunderclient

#### Start by Logging in

```http
  POST /api/users/login
```

- Email: user@example.com, Password: test1234
- or
- Email: admin@example.com, Password: test1234

- After login, take the JWT in the response and paste it in the Authorzation header as 'Bearer {token}'.
- By doing this, you can access the protected routes.

#### Or start by creating your own account

```http
  POST /api/users
```

- Make Sure to Log in after creating your account with required fields.
- You can't make an account for an Admin, because you need to be logged in.
- So login by the credentials provided above and then use all the features of Admin.
- There is a single login for both 'user' as well as 'admin'.
