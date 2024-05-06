# Meal Mapper

## Description

This back-end application is used along with the front-end repo that we have created! Head over to: [this repository](https://github.com/DaveSalterM/meal-planner-front-end)

This application is for recipe-creating enthusiasts. It is a MongoDB API that allows the user to get, post, put, delete users, recipes, reviews, and images. If you feel like you want to add something to this API, feel free to clone this repo onto your local machine. Please note that this requires Node.JS and MongoDB installed for it to work properly.

## Installation

Additionally, you may need to change some configurations in this repository. You will need to edit the `connection.js` file in the `config` folder. All that needs to be changed is commenting out `connectionString` and commenting in the one below it (also called `connectionString`). Additionally, head over to the `uploadController.js` file in the `controllers` foler and comment out `lines 10-12` and comment in `lines 7-9`. Lastly, create your own `.env` file in the root directory and add `TOKEN_SECRET=` and add any string that you want.

Install all npm packages required:

```
npm i
```

Lastly, run this command in the root directory to start the application:

```
nodemon
```

## Technologies

- MongoDB
- Javascript

## Resources

Other NPM packages used:

- Express
- bcrypt
- jsonwebtoken
- mongoose
- multer

## Contributing

Feel free to reach out for any issues, remarks, or feature requests!

## Contact Us

Contributors contact:

GitHub accounts: [Kyle Yee](https://github.com/kyleyee522), [Willie Yeh](https://github.com/willieyeh1), [David Salter](https://github.com/DaveSalterM), and [Keanu Ford](https://github.com/KeanuFord)
