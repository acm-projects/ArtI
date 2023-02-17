<p align="center"><img src="https://tinypic.host/images/2023/01/24/ArtILogo.png"
     alt="ArtI"
     style="
        height: 70px;
        width: auto;" /></p>

AI art has devalued the work of artists in addition to stolen actual artists’ work to create cheap impressions of “art”, but what if AI could help artists? Instead of appropriation, ArtI uses AI for inspiration; using generated images, artists use ArtI to create and save plausible compositions and reference images for their next piece!

## MVP 🎯

- User account registration and authentication
- User profile page:
  - Allows users to create and view their saved boards
- “AI image generator based on entered text” tab
  - Allows user to save generated images within a chosen board
- “AI-generated portrait” tab
  - Allows user to save generated images within a chosen board

## Stretch Goals 🏁

- Download the generated images and boards onto device
- Post image(s) into a community space
  - Other users are able to like and comment on the post
  - User can choose to upload their resultant artwork
  - User can choose to upload their inspiration board

## Tech Stack 📚

- Frontend 🎨:
  - Figma:
    - [Figma basics tutorial](https://youtu.be/II-6dDzc-80)
  - React.JS:
    - [React.JS basics tutorial](https://youtu.be/w7ejDZ8SWv8)
    - [React.JS intermediate tutorial](https://youtu.be/bMknfKXIFA8)
    - HTML & CSS:
      - [HTML & CSS cheatsheet](https://ilovecoding.org/blog/htmlcss-cheatsheet)
      - [Learn HTML & CSS here](https://www.w3schools.com/)
- Backend 👾:
  - MongoDB (database):
    - [Getting Started with MongoDB](https://youtu.be/bBA9rUdqmgY)
    - [MongoDB Crash Course](https://youtu.be/2QQGWYe7IDU)
  - REST API:
    - [REST API using NodeJS and MongoDB](https://youtube.com/playlist?list=PLdHg5T0SNpN3EoN3PEyCmPR42Ok_44OFT)
- APIs ☁️:
  - [Open AI’s Images API](https://beta.openai.com/docs/guides/images): first 1000 requests are free
  - [Face Generator API](https://rapidapi.com/arraybobo/api/facegen): 20 requests/month are free
  - [100K Faces API](https://github.com/ozgrozer/100k-faces)
  - [Fake Face API](https://hankhank10.github.io/fakeface/)

## Software to Install 🔗

- IDE: [Visual Studio Code](https://code.visualstudio.com/)
- Version control: [Git](https://git-scm.com/downloads)
- User interface: [React](https://reactjs.org/)
- API platform: [Postman](https://www.postman.com/downloads/)
- Backend API calls: [Node.js](https://nodejs.org/en/download/)
- Database: [MongoDB](https://docs.mongodb.com/manual/installation/)
- Database: [Express.js](https://expressjs.com/)

## Tutorials 🏫

- Frontend 🎨:
  - [Forms in React](https://youtu.be/bMknfKXIFA8?t=28132) (7:48:52 - 8:46:45)
- Backend 👾:
  - [MERN User Authentication](https://youtu.be/HGgyd1bYWsE)
  - [Uploading imagesto database tutorial pt.1](https://youtu.be/dapS3HkX3Wc) and [pt.2](https://arosh-segar.medium.com/how-to-upload-images-using-multer-in-the-mern-stack-1c6bf691947e)
- API Calls ☁️:
  - [Build an AI [Human] Photo Generator tutorial](https://youtu.be/z5VH_XjDXK8)
  - [Open AI docs](https://beta.openai.com/docs/guides/images)
  - [Build An AI [Text-Based] Image Generator in JS tutorial](https://youtu.be/fU4o_BKaUZE)
  - [Generate Images using React and Dall-E API tutorial](https://youtu.be/oacBV4tnuYQ)
  - [Open AI Node.js Library](https://github.com/openai/openai-node)

## GitHub Cheat Sheet 🔄

[Master Github Cheat Sheet](https://www.atlassian.com/dam/jcr:8132028b-024f-4b6b-953e-e68fcce0c5fa/atlassian-git-cheatsheet.pdf)

| Command                       | Description                               |
| ----------------------------- | ----------------------------------------- |
| cd "ArtI"                     | Change directories over to our repository |
| git status                    | Outputs status of files                   |
| git add .                     | Finds all changed files                   |
| git commit -m "TestyTestTest" | Commit with message                       |
| git push origin "branch"      | Push to branch                            |
| git pull origin "branch"      | Pull updates from a specific branch       |
| git branch                    | Lists branches for you                    |
| git branch "branch name"      | Makes new branch                          |
| git checkout "branch name"    | Switch to branch                          |
| git checkout -b "branch name" | Same as 2 previous commands together      |

## Timeline 📆

- **General 🏃:**
  - Agree on member roles and app MVP **(week 1)**
  - Downloading software, setting up environment, and learning Git **(week 1)**
  - Weekly meeting where frontend and backend update each other and integrate code accordingly **(weeks 2-8)**
    Presentation preparation **(weeks 8-10)**
- **Frontend 🎨:**
  - Sign up for Figma and learn basics **(week 1)**
  - Make wireframes and revise them if needed **(week 2-3)**
    - Signup, login, user profile w/ saved boards, “AI image generator” page, and “AI-generated portrait” page
  - Learn the React.js **(weeks 3-8)**
  - Code UI for pages and integrate with backend accordingly **(weeks 3-8)**
    - Login and signup pages **(week 3)**
    - Learn how to use APIs + “Ai-generated portrait” page **(weeks 4-5)**
    - “AI image generator” page **(week 6)**
    - User profile w/ saved boards **(weeks 7-8)**
  - Create presentation **(weeks 8-9)**
- **Backend 👾:**
  - Learn basics for MongoDB **(weeks 1-3)**
    - Learn basics for Express
  - Set up databases based on user profile **(week 3)**
    - User account authentication **(week 4)**
    - Push user’s generated images from app to database **(weeks 5-6)**
    - Pull user’s post information from database to app’s “saved boards” feature **(weeks 7-8)**
  - Final integration of frontend and backend **(week 8)**

## Additional Resources ✒️

- [How to be successful in ACM Projects](https://docs.google.com/document/d/18Zi3DrKG5e6g5Bojr8iqxIu6VIGl86YBSFlsnJnlM88/edit?usp=sharing)
- [Web Design Inspiration - Dribble](https://dribbble.com/shots/popular/web-design)
- [Git cheat sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Git in-depth tutorial](https://youtu.be/RGOj5yH7evk)
- [Git collaboration tutorial](https://youtu.be/jhtbhSpV5YA)
- [Postman setup tutorial](https://youtu.be/3eHJkcA8mTs)
- Share graphics using [Box](https://utdallas.account.box.com/login)
- Make presentations with either [Pitch](https://pitch.com/) or [Canva](https://www.canva.com/)

## The Team 🌟

- <b><i> Zara Iqbal🎨 </i></b>
- <b><i> Rommel Isaac Baldivas👾 </i></b>
- <b><i> Shelley Sugiharto🎨 </i></b>
- <b><i> Leon Zhang👾 </i></b>

- <b> Susan Zhang </b> - Project Manager
- <b> Yun Ho Jung </b> - Industry Mentor

I did it!
my branch.
