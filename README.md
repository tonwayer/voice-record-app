# voice-record-app

A full stack application, backend in Python, frontend in React + Typescript.

## How to run

### Clone this repo

  ```
  git clone https://github.com/tonwayer/voice-record-app.git
  ```

### Backend

- Change directory into backend
  ```
    cd backend
  ```

- Create a virtual environment:
  ```
    virtualenv -p python3.10 env
  ```

- Activate the environment:

  - For Linux and Mac machines
    ```
      source env/bin/activate
    ```

  - For Windows machine:
    ```
      source ./env/Scripts/activate
    ```

- Install the dependencies:
  ```
    pip install -r requirements.txt
  ```

- Finally run
  ```
    python server.py
  ```

### Frontend

- Change directory into frontend
  ```
    cd frontend
  ```
- Install the dependencies:
  ```
    npm install
  ```
- Make your own .env from .env.example:
- Finally run
  ```
    npm start
  ```