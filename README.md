
# Talabat Bot

A simple telegram bot to ping busy or closed restaurants every 5 minutes to report back when they're avaiable to order.



## Deployment

This app uses docker so you need it installed first, for more information check [Docker Docs](https://docs.docker.com/).

1. clone this repo
```bash
  git clone https://github.com/Mohamed-Magid/Talabat-Bot.git
```
2. navigate to project's directory
```bash
  cd path/to/project
```
3. Rename `.env.example` to `.env` and place your environment variables.
 
4. Build the docker image
```bash
  docker build -t talabat-bot .
```
5. Run the docker container
```bash
  docker run -p 5000:5000 -d --restart always --name talabat-bot-container talabat-bot
```
And That's it.

## Side Note
This bot works only with talabat's URLs that is copied from talabat's web app and not from talabat's application, the reason for that is shared links from talabat's app doesn't specify the location of the restaurant.

Example of a valid url:
`https://www.talabat.com/ar/egypt/restaurant/xxxxxx/restaurant-name--restaurant-location?aid=xxxxx`
