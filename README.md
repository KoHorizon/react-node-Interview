##  Installation
 
* Clone this repository on your local computer
* Run the `docker-compose up`.

```shell
git clone https://github.com/KoHorizon/react-node-Interview.git
cd react-node-Interview/
// modify password as needed in docker-compose.yml
docker-compose up
// visit localhost:(port)
```
Open `http://localhost:3000` in your browser.

Default password is `pass123`



## ! Warning !

This project have been developed on Linux. 
This Docker container might have issues to launch on Windows and Mac (Issues are currently being fixed)


If you are on Mac or Windows, please launch both folders separately.
* Use the template file environnement `(.env.template)` to create a `.env` in backend ! 
* If needed change the url of the backend in frontend file environnement `(.env)`
