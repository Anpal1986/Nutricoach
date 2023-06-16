# Nutricoach
This corresponds to the Project2 of the bootcamp in Web Development from Ironhack.


## Project Description:

Nutricoach is a website related to nutrition and coaching. 
The website is containing products related to this topic, it has the following sections:

Navbar:
* Left side: Home, Products, Create, Sign up and Log in
* Right side: Log Out

### Web functionalities (navbar & restrictions)

1. Under products: you can see the list of products available
    - Product title (duplicated titles are not possible)
    - Description 
    - Price
        * The user can click on More Details or edit (functionality just for logged in users))
2. Under create
    - The user can create products
        * Title and price are mandatory
3. Sign up
    - The user can register providing (username, email and password)
        * Name and password needs to be unique
4. Log in
    - The user can log in giving him/her the user details
        * The user can not let any field in blank, all are mandatory
    - Users that are logged in can:
        * Edit products (Products --> Edit)
        * Delete products (Products --> More details --> Delete)
        * Create products
5. Log out
    - The user can log out just clicking the button (cache will be cleared automatically)

### Instructions: How to run the app in your computer

1. Install dependencies: 
    - Create a folder where you save the project
    - Get into the folder with your terminal: cd Nutricoach
    - Open the terminal: npm install -g nodemon
2. Environment variables: 
    - Please create a file called .env (under the main file)
    - add the following text
    PORT=3000
3. Run the application:
    - Once you are on the right folder (step 1) write the command: npm run dev
    - When you are connected you will receive a message: Connected to Mongo!

### Demo link (adaptable)

https://nutricoach.adaptable.app/

#### Possible improvements:

    1. Add a new tab with Recipes (just available for registered users)
    2. Add a new tab with videos of exercises (just available for registered users)
    3. Add more responsiveness for Mobile devices
    4. The users can modify and delete their own products, recipes and videos

---

* Information: This app was developed with learning purposes on 06.2023

