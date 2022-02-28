##  Installation
 
* Clone this repository on your local computer
* Run the `docker-compose up`.

```shell
git clone https://github.com/KoHorizon/react-node-Interview.git
cd react-node-Interview/
// modify password if you want in docker-compose.yml
docker-compose up
// visit localhost:(port)
```
Open `http://localhost:3000` in your browser.

Default password is `pass123`

You can manually import `Products.json` in your MongoDB if you want to have some data to be seen

## If you don't want to use Docker

Launch both folders separately.
* Use the template file environnement `(.env.template)` to create a `.env` in backend ! 
* If needed change the url of the backend in frontend file environnement `(.env)`


## Stack used

* Backend (Node/Typescript/Express)
* Frontend (React/Typescript/ViteJS)

Features :
* JWT/Token Authentification 


Tools:
* ESLint 
