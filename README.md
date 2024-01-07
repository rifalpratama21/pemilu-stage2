# DOCUMENTATION

## LIST OF CONTENT
1. [AUTH](#AUTH)
2. [ARTICLE](#ARTICLE)
3. [PASLON](#PASLON)
4. [PARTAI](#PARTAI)
5. [VOTE](#VOTE)

## **AUTH**
### Register
* URL : `http://localhost:5000/api/v1/auth/register`
* Method : `POST`
* Require Token : `No`
* Request Body :
```json
{
    "fullname": "John Doe",
    "address": "Victoria St.",
    "gender": "Laki-laki",
    "username": "johndoe",
    "password": "12345678"
}
```
* Response Body :
```json
{
    "message": "Register Success",
    "data": {
        "fullname": "John Doe",
        "address": "Victoria St.",
        "gender": "Laki-laki",
        "username": "johndoe",
        "password": "1145bjk4olb145n13lb5hjb15blj134k5bk", // password encrypted
        "id": 1
    }
}
```

### Login
* URL : `http://localhost:5000/api/v1/auth/login`
* Method : `POST`
* Require Token : `No`
* Request Body :
```json
{
    "username": "johndoe",
    "password": "12345678"
}
```
* Response Body :
```json
{
    "message": "Login Success",
    "token": "/encrypted token/"
}
```

## **ARTICLE**
### Get all article
* URL : `http://localhost:5000/api/v1/article`
* Method : `GET`
* Require Token : `No`

### Get article by ID
* URL : `http://localhost:5000/api/v1/article/:id`
* Method : `GET`
* Require Token : `No`

### Create/Post an article
* URL : `http://localhost:5000/api/v1/article/`
* Method : `POST`
* Require Token : `Yes`
* Request Body :
```json
{
    "title": "KPU Dumbways tetapkan 3 mentor terbaik",
    "description": "Ini deskripsi artikel pemilu",
    "image" : "Image.jpg" //insert image file
}
```
* Response Body :
```json
{
    "message": "Create Success",
    "data": {
        "id": 1,
        "title": "KPU Dumbways tetapkan 3 mentor terbaik",
        "author": "John Doe", //get from user login session
        "description": "Ini deskripsi artikel pemilu",
        "image": "https://res.cloudinary.com/asdkjgkd.jpg" //image saved on cloud with secure url
    }
}
```

### Update Article by ID
* URL : `http://localhost:5000/api/v1/article/:id`
* Method : `PATCH`
* Require Token : `Yes (With same Author/User)`
* Request Body :
```json
{
    "title": "KPU Dumbways tetapkan 5 mentor terbaik",
    "description": "Ini deskripsi artikel pemilu",
    "image" : "Image.jpg" //insert image file
}
```
* Response Body :
```json
{
    "message": "Update Success",
    "data": {
        "id": 1,
        "title": "KPU Dumbways tetapkan 5 mentor terbaik",
        "author": "John Doe", //get from user login session
        "description": "Ini deskripsi artikel pemilu",
        "image": "https://res.cloudinary.com/asdkjgkd.jpg" //image saved on cloud with secure url
    }
}
```
### Delete article by ID
* URL : `http://localhost:5000/api/v1/article/:id`
* Method : `DELETE`
* Require Token : `Yes`

## **PASLON**
### Get all paslon
* URL : `http://localhost:5000/api/v1/paslon`
* Method : `GET`
* Require Token : `No`

### Get paslon by ID
* URL : `http://localhost:5000/api/v1/paslon/:id`
* Method : `GET`
* Require Token : `No`

### Create a paslon
* URL : `http://localhost:5000/api/v1/paslon/`
* Method : `POST`
* Require Token : `Yes`
* Request Body :
```json
{
    "name": "Luffy",
    "visi_misi": "Membawa perdamaian kepada semua ras dan infected",
    "image": "Luffy.jpg"
}
```
* Response Body :
```json
{
    "message": "Create Success",
    "data": {
        "id": 1,
        "name": "Luffy",
        "no_urut": 1, //auto count
        "visi_misi": "Membawa perdamaian kepada semua ras dan infected",
        "image": "https://res.cloudinary.com/asdkjgkd.jpg" //image saved on cloud with secure url
    }
}
```

### Update paslon by ID
* URL : `http://localhost:5000/api/v1/paslon/:id`
* Method : `PATCH`
* Require Token : `Yes`
* Request Body :
```json
{
    "name": "Luffy",
    "visi_misi": "Membawa perdamaian kepada semua ras dan infected",
    "image": "Luffy.jpg"
}
```
* Response Body :
```json
{
    "message": "Update Success",
    "data": {
        "id": 1,
        "name": "Luffy",
        "no_urut": 1, //auto count
        "image": "https://res.cloudinary.com/asdasdfawef.jpg" //image saved on cloud with secure url
    }
}
```
### Delete paslon by ID
* URL : `http://localhost:5000/api/v1/paslon/:id`
* Method : `DELETE`
* Require Token : `Yes`

## **PARTAI**
### Get all partai
* URL : `http://localhost:5000/api/v1/partai`
* Method : `GET`
* Require Token : `No`

### Get partai by ID
* URL : `http://localhost:5000/api/v1/partai/:id`
* Method : `GET`
* Require Token : `No`

### Create a partai
* URL : `http://localhost:5000/api/v1/partai/`
* Method : `POST`
* Require Token : `Yes`
* Request Body :
```json
{
    "name": "Partai Ursus Empire",
    "leader": "Patriot",
    "visi_misi": "The might of Ursus shall be glorified across the land!",
    "address": "Deity Grypherburg",
    "image": "ursus.jpg",
    "paslonId": 2 //coalition with ID paslon
}
```
* Response Body :
```json
{
    "message": "Create Success",
    "data": {
        "name": "Partai Ursus Empire",
        "leader": "Patriot",
        "no_urut": 1, // auto count
        "visi_misi": "The might of Ursus shall be glorified across the land!",
        "address": "Deity Grypherburg",
        "image": "https://res.cloudinary.com/asdkjgkd.jpg", //image saved on cloud with secure url
        "paslon": 2
    }
}
```

### Update partai by ID
* URL : `http://localhost:5000/api/v1/partai/:id`
* Method : `PATCH`
* Require Token : `Yes`
* Request Body :
```json
{
    "name": "Partai Ursus Empire",
    "leader": "Frostnova",
    "visi_misi": "The might of Ursus shall be glorified across the land!",
    "address": "Deity Grypherburg",
    "image": "ursus.jpg",
    "paslonId": 1 //coalition with ID paslon
}
```
* Response Body :
```json
{
    "message": "Update Success",
    "data": {
        "name": "Partai Ursus Empire",
        "leader": "Frostnova",
        "no_urut" : 1,
        "visi_misi": "The might of Ursus shall be glorified across the land!",
        "address": "Deity Grypherburg",
        "image": "https://res.cloudinary.com/asdkjgkd.jpg", //image saved on cloud with secure url
        "paslon": 2
    }
}
```
### Delete partai by ID
* URL : `http://localhost:5000/api/v1/partai/:id`
* Method : `DELETE`
* Require Token : `Yes`

## **VOTE**
### Get all vote
* URL : `http://localhost:5000/api/v1/vote`
* Method : `GET`
* Require Token : `No`

### Add Vote
* URL : `http://localhost:5000/api/v1/vote`
* Method : `POST`
* Require Token : `YES`
* Request Body :
```json
{
    "paslonId": 1 // vote ID paslon
}
```
* Respon Body :
```json
{
    "message": "Vote Success",
    "data": {
        "users" : 1, // get from user login session
        "paslon" : 1 // ID paslon
    }
}
```