<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

This is a student project we made as part of our education at [Soy Henry](https://www.soyhenry.com/), which consisted of creating a full-stack React application from scratch.

### Our stack of technologies:

- Front End:

  - HTML - CSS - Javascript
  - React
  - Redux
  - Material-ui
  - Animejs

- Back End:

  - Node.js
  - Express
  - Passport
  - Mongoose
  - Firebase

- Database:
  - MongoDB

# How to start the project:

If you want to see the page for yourself, you'll need to do the following:

- Clone the repository
- Create a `.env` file in the `client` folder with the following contents:

```
REACT_APP_API_URL=http://localhost:3001
```

- Install [Mongoodb](https://www.mongodb.com/) on your computer and create a database called `HenryApp`.
- Head to the [Google](https://console.developers.google.com/projectselector2/apis/dashboard?supportedpurview=project)developer consoles to obtain your OAuth keys. If you're unfamiliat with the process, you can find some helpful guides [here](https://developers.google.com/fit/android/get-api-key).

- Sign up with [Mailgun](https://www.mailgun.com/) and obtain an API key.

- Create a `.env` file in in the `api` folder with the following contents:

```
DATABASE_ATLAS=mongodb+srv://HenryApp:HenryAppAtlas@cluster0.bucqc.mongodb.net/test

passportSecret={Anything you want}

googleClientID={Your Google OAuth ID}
googleClientSecret={Your Google OAuth secret}

mailgunApiKey={Your Mailgun API key}
mailgunDomain={Your Mailgun domain}
```

The app doesn't have any products or users created by default, you'll have to add them yourself! In order to do so, you'll have to log in as an admin. The default admin is:

```
Email: admin@henry.com
Password: admin
```

# Previews

### Welcome:

![alt text](./Readme_images/welcome.jpeg "Welcome")

### Module:

![alt text](./Readme_images/module.jpeg "Module")

### Home Student:

![alt text](./Readme_images/student.jpeg "Home Student")

### Chat:

![alt text](./Readme_images/chat.jpeg "Chat ")

# About Us:

We are a group of 9 [Soy Henry](https://www.soyhenry.com/) students. These are our Github accounts:

- [Lismairy Alejandra Sánchez Hernández](https://github.com/Lismairy-Sanchez)
- [Alejandro Zdut](https://github.com/alezdut)
- [Sebastian Lescano](https://github.com/fayser17)
- [Cesar Contreras](https://github.com/cescontreras)
- [Vanesa Lozano](https://github.com/nvlozando)
- [Vanesa Lozano](https://github.com/nvlozando)
- [Alexis Enriquez](https://github.com/Alexis-Enriquez)
- [Santiago Barrios](https://github.com/SantiagoLesait)
- [Leonela VonTauzz](https://github.com/leonelatauzz)
