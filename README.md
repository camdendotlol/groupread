# Groupread - Self-hosted reading groups

**Notice: As of December 14, 2021, this project is archived and no longer deployed. I started it when I barely knew how to code, and I've sunk many hours into bringing things up to speed, with a lot more time still required to bring it up to my current standards. I still want to make a reading group platform at some point, but at this point I think it would be faster to make something new from scratch, maybe using Groupread as a general guide.**

Groupread is a **self-hostable** platform for hosting book discussions.

Pick a book via OpenLibrary's API and Groupread will fill in the metadata and create a discussion group. Each group is inextricably tied to one book, which emphasizes the frictionless group creation process and keeps discussion focused and on-topic.

A demo server is available at [https://gr.camdenmecklem.com/](https://gr.camdenmecklem.com/).

## Table of Contents

- [Self-hosting](#self-hosting)

- [Contributing](#contributing)

- [To do](#to-do)

- [Developer notes](#developer-notes)

## Self-hosting

To self-host, you will need:

- [npm](https://www.npmjs.com/)

- A database of any kind supported by [Sequelize](https://sequelize.org/)

To begin, ``git clone`` the repo into your desired location. This repository includes both the frontend and the backend.

Groupread uses the Sequelize ORM, which supports Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server, but requires a driver package for the chosen database. By default, Groupread includes the ``pg`` and ``pg-hstore`` packages for Postgres support. If you wish to connect to another database from the list, you must add the required driver ([detailed here](https://sequelize.org/master/manual/getting-started.html#installing)) to ``package.json``.

Now you can run ``npm install`` to install dependencies.

Generate a fresh build of Groupread with `npm run build`, which places the compiled JS files in `./build`.

The server expects the following environment variables:

- **DB_URL**: the URL to the database you plan to use. The tables will automatically be created on first run.

- **TEST_DB_URL**: the URL to the database used for running tests. **Warning**: This database is repeatedly wiped during tests. Do not use the same one that you used above.

- **SECRET**: bcrypt's secret parameter, used for generating secure tokens. Use a long, random string.

- **PORT**: the port on which the server will run.

Before launching, you might want to run the test suite to make sure everything works. ``npm run test:jest`` will run the backend unit tests.

To run end-to-end tests, start Groupread in testing mode with `npm run start:cypress`. In another terminal, use `npm run test:e2e` to run the end-to-end tests.

Now you can run ``npm start`` to serve a production-ready app. The site will be hosted locally, e.g. at [http://localhost:3000/](http://localhost:3000/) if you set ``PORT`` to 3000.

## Contributing

This project welcomes contributions.

You can host a live server on your local machine to make development easier. After cloning the repo and running ``npm install``, start the development backend server with ``npm run dev:server`` and the frontend development server with ``npm run dev:ui``. The frontend will be served at [http://localhost:3001/](http://localhost:3001/).

If you plan to work on new functionality, please file an issue first so no one duplicates your efforts.

Before submitting a pull request, make sure to lint your code with ``npm run lint`` and test with the relevant testing commands. Code style isn't very strict right now beyond the basic linting rules, although more stringency might be enforced in the future.

All contributions are licensed under the [GNU Affero General Public License v3.0](https://github.com/mythmakerseven/groupread/blob/main/LICENSE).

## To do

⭐ = priority level

- moderation tools for group owners ⭐⭐⭐

  - kick users (should function as a permanent ban, reversible by the admin)

  - remove posts

- proper frontend testing with Cypress (current status: cypress is fully set up for end-to-end testing with some tests written, but coverage is lacking) ⭐⭐⭐

- basic user profile pages, nothing fancy (current status: an API call to fetch your own info is implemented, it should be simple to write another one for getting other users' info with some personal data removed) ⭐⭐

- migrate to the Google Books API for metadata ⭐

- Docker container for easier self-hosting ⭐

- logo ⭐

### Completed

- ~~convert backend to TypeScript~~

- ~~enhanced security (token expiration and validation, etc)~~

- ~~fix all remaining TypeScript errors and add strict checks to the build process~~

- ~~automated scheduling of discussion threads~~

- ~~better looking group list, probably some flexbox with book covers~~

- ~~list of groups the current user has joined, preferably as a navbar dropdown~~

- ~~editing functionality~~

- ~~proper display of authors for books with multiple authors~~

- ~~address webpack warning about bundle size to improve loading performance~~

## Developer notes

This has been my largest project by far, not least because I have challenged myself with new tools and techniques compared to previous projects. All my previous database work involved MongoDB, but for Groupread I branched out into Postgres, which led to replacing Mongoose with Sequelize. Sequelize is definitely more complex than Mongoose, and its docs are pretty bad. Particularly in the early stages of development, I had a lot of issues caused by poor documentation of basic functionality. I managed to hack it together with the help of random blog posts and StackOverflow pages, and now it's not too hard to work with.

On the frontend, I tried out the up-and-coming Bulma CSS framework, which I've found more visually pleasant and performant than Material or Semantic UI. This has also been my first significant experience with modals, which are used for the login/register form as well as the book metadata search popup. Bulma requires more manual coding to make modals work compared to other UI libraries, but I like the increased customization it provides.

I also chose not to use create-react-app, if only to learn more about the internal workings of packaging web applications. This move had surprisingly few drawbacks - maybe five or six hours of total time configuring and troubleshooting with webpack and eslint. In the future I'll probably go with create-react-app again, because there also hasn't been much benefit in dropping it. It has been good to learn more about what create-react-app is doing in the background, anyway.

When I began working on Groupread, I had no significant experience with TypeScript. Since then, I've become much more comfortable working with it, so I use it for new code and I'm gradually adding making use of TypeScript features for old code. Types should strengthen data validation and simplify the backend code. I've already caught frontend bugs thanks to TypeScript's strict null checks.
