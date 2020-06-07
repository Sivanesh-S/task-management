# Resources

- [Github](https://github.com/Sivanesh-S/task-management)
- [Demo Video](https://youtu.be/TjWgZ-qoaVQ)
- [Figma](https://www.figma.com/file/iAACf3zon5XLdBqBXjK2Bk/Task-Management-Advanced?node-id=3%3A689)

# Used Stack and technologies

- **MERN Stack -** MongoDB, Express, React, Node.js
- Used two types of authentication,
  - basic using **JWT.**
  - And for OAuth lovers for quickly accessing and using I used **Google OAuth2.0** for authentication. With complete setup residing between client and server.
- For designing and prototypes I learned and used **Figma**. One of the awesome tool for designing. **[My Figma Link](https://www.figma.com/file/iAACf3zon5XLdBqBXjK2Bk/Task-Management-Advanced?node-id=3%3A689)**
- Components created as a mixture by me using both my designs and ant design.
- Client made with the latest ES6 and hooks way.
- State management is handled by native implementations with the help of
  - **React Context and providers**
  - **useReducer**

# Folder structure

```jsx
client; // contains all client's code (React)
server; // contains server code (Mongodb, express, Node)
```

## MongoDB Connection

- Create a online Atlas Mongo DB connection from this [link](https://account.mongodb.com/account/login?).
- Add them to my project by creating a file `.env` at location `./server` and the file will reside in `server/.env`.

```jsx
PORT=8080
JWT_PRIVATE_KEY=<your jwt private key>
MY_MONGODB_USERNAME=<your mongodb username>
MY_MONGODB_PASSWORD=<your mongodb password>
```

Then the database will be setup and collections, databases will be handled automatically by my server.

## Google authentication

- As I don't have time to host my server Google authentication won't be working. 😢.
- If you're interested, create a dummy app in [Google Developer Console](https://console.developers.google.com/). And append the `clientId` in the file `App.js` and `AuthPage.js` there are the two places where we seek google for user authentication.
- Once done it will be completely setup

**PS:** I know completely running and up checking my setup is difficult. I'm writing this in the last hour so I too couldn't give the complete docs with absolute perfection.

## Steps to start the app

```jsx
cd server
npm run dev
cd ../client
npm run start
```

## Any doubts or issues feel free to contact me 😃

- sivanesh.code@gmail.com
- [LinkedIn](https://www.linkedin.com/in/sivanesh-shanmugam/)
- [Twitter](https://twitter.com/sivanesh_fiz)
- [Github](https://github.com/Sivanesh-S)
