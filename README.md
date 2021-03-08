# Serve everything
A express-node based server that supports multiple frontend project wiritten in Vue/React/JQuery

*Note: This project also includes other client project served as submodules.*

## Setup

If you haven't pull this repo before, please do
```bash
git clone --recursive https://github.com/enw860/serve_everything.git

cd serve_everything
```

Or,
```bash
git clone https://github.com/enw860/serve_everything.git

cd serve_everything

git submodule update --init --recursive
```

## Update code
```bash
git pull && git submodule update --init --recursive
```

## Build

Environment setup:
```bash
npm i
```

Launch in production mode:
```bash
npm start
```

Launch in dev mode:
```bash
npm run dev
```

## Other - Email functionalities
The server also integrated with [SendGrid](https://app.sendgrid.com/) email services, you will need to create your own account for the mail services.

Note: please remember to expose following fields to your environment: 
1. your sender email address -> `SENDGRID_FROM_EMAIL` 
2. your SendGrid API key -> `SENDGRID_API_KEY`