To run the server, cd into the `sample-server` directory and run:
 
- npm i
- npm start


To run the client, cd into the `MyAngularClient` directory and run:
 
- npm install 
- npm start

Note:
If got error on openssl then execute below command:
- set NODE_OPTIONS=--openssl-legacy-provider


========SQL SCRIPT ==================
- PostgresSQL

CREATE TABLE PRODUCT(
   ID VARCHAR(50) PRIMARY KEY     NOT NULL,
   NAME           VARCHAR(50),
   DESCRIPTION          TEXT,
   PRICE        numeric,
   CATEGORY_ID  VARCHAR(50) NOT NULL
);

CREATE TABLE CATEGORY(
   ID VARCHAR(50) PRIMARY KEY     NOT NULL,
   NAME           VARCHAR(50),
   DESCRIPTION          TEXT
);
