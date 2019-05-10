# NodeJs registration-login example

The purpose of this project is to learn the basic operations of login, registration and session management in a website.

## Requirements

### Base
* [NodeJs](https://nodejs.org/en/) Used version: 10.15.3
* [MySql](https://www.mysql.com) Used version: 8.0.15


### Node Frameworks

* client-sessions Version ^0.8.0
* express Version ^4.16.4
* Jade Version ^1.11.0
* mysql Version ^2.17.1

## Installation

In the main directory of the application launch the command
```
npm install
```

## Configuration

edit the file **/config/mysql_config.json** and change the parameters with those of your MySql server
```
{
    "host": "HOST_NAME",
    "user": "USERNAME",
    "password": "PASSWORD",
    "database": "DB_NAME"
}
```

### MySql Table

here the user Table to place into the Db
```
CREATE TABLE `users` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`username`)
)
```

### How To generate a simple selfsigned certificate

```
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -keyout privatekey.key -out certificate.pem
```

## Authors

* **[SirZiphon](https://github.com/SirZiphon)** - Initial work

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details