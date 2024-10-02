# TuneForge ![Logo](Images/Group.png)
    TuneForge is an interactive website that allows the user to create (or forge) a song based on the artist and song name snd then generate a link to the URL of the song of their choosing. The user can then create a playlist and drag their newly forged song into the playlist of their creation.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Contribute](#contribute)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features
- Feature 1
    The first feature of the apllication is the ability to log in using an email address and password to to access the TuneForge.
    ![LogIn](Images/Screenshot%202024-10-02%20at%2012.31.14 PM.png)
- Feature 2
    The user is greeted with a hero image that explains the process of forging a tune. They can then enter the artist name, song title, and URL to the song the would like to link. When the user clicks the "Forge My Tune" button a link to the song with the artist name and song name is then created.
    ![Hero](Images/Screenshot%202024-10-02%20at%2012.33.33 PM.png)
- Feature 3
    The user created link is then placed in the "Recently Forged" section of the page. The newly created song(s) are accompanied by 2 buttons. The first button allows the user the ability to drag the tune into a playlist (- Feature 4). The second button, titled "Reforge", allows the user to edit the songs artist name, song title, and URL if there were any mistakes. The modal that is presented then take the edited song link and adds it back to the "Recently Forged" section. 
    ![NewSong](Images/Screenshot%202024-10-02%20at%2012.35.26 PM.png)
    ![Modal](Images/Screenshot%202024-10-02%20at%2012.36.39 PM.png)
- Feature 4
    The "Create a New Playlist" section allows the user to enter the name of the playlist they would like to create. When the user clicks the "Create!" button an accordion style list is created below the "Create a New Playlist" section.
    ![LogIn](Images/Screenshot%202024-10-02%20at%2012.40.03 PM.png)
- Feature 5
    Above the playlists, the users provided email address is displayed with a logout button below the email. If the user would like to go back to the login page and log themselves out, they can use the "Logout" button.
    
    ![LogIn](Images/Screenshot%202024-10-02%20at%2012.41.28 PM.png)

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:yahye-mohamed101/PlaylistCreation.git
2. Navigate to the repository :
    ```bash
    cd PlaylistCreation
3. Start coding:
    ```bash
    code .
## Contribute

1. Create a new branch:
    ```bash
    git checkout -b <feature/name>
2. Add your changes when ready:
    ```bash
    git add -A
3. Make your changes and commit them. Be sure to be descriptive in your message:
   ```bash
   git commit -m "Add a descriptive commit message"
4. Push your changes:
    ```bash
    git push origin <feature/name>
5. Go to the repository on GitHub and open a pull request. Make sure to compare your branch name to the main branch. 

## License
Please refer to the license at https://github.com/yahye-mohamed101/PlaylistCreation?tab=MIT-1-ov-file

## Acknowledgments
- **[Josh Askew, Yahye Mohamed, and Ethan Carr]** - For the initial concept and project management.
- **[Braylon Medvec]** - For their invaluable contributions do the design and wireframe concepts.
- **[Bootstrap]** - This project uses Bootstrap, which provides excellent features for some buttons, accordions, and modal styling.
- **Community Support** - Thanks to the MDN and W3 Schools documentation for discussions and support during the development process.