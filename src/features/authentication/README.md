# Authentication

The authentication process makes use of JsonWebToken and relies on validating the email and password used during registration to login to the system. The registration process takes the username, password, confirm password and email. The email and username has to be unique for every user. The idea is to not create a very fancy authentication system but rather a simple one and rely more on implementing the core features to work better.
