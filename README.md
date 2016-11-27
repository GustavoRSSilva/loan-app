# `Loan App` — Angular application with firebase

to clone:
```
git clone git@github.com:GustavoRSSilva/loan-app.git
```

make sure you have npm and bower installed.

to run:
```
npm install
```
```
npm start
```

go to:
```
http://localhost:8000/
```

###As a user not logged in:

As a user not registed, i can:
- View all the available loan;
- Sign Up;
- Sign In;

![alt tag](https://github.com/GustavoRSSilva/loan-app/blob/master/assets/app_not_logged.jpg)

###As a user logged in, i can:

As a user, i can:
- View all the available loan;
- Sign Out;
- View all my post request (green for approved, red for reject, grey for pedding approval)

![alt tag](https://github.com/GustavoRSSilva/loan-app/blob/master/assets/app_logged_in.jpg)

###As a Admin, i can:
- Create, Read and delete loan options;
- View all loan request, approve or reject anyone of them;

![alt tag](https://github.com/GustavoRSSilva/loan-app/blob/master/assets/admin_backoffice.jpg)


##tests - Karma, previous Jasmine (deprecated)

to run:
```
npm test
```

#BDD

in this application the behavial tests are done in the directory e2e (end to end), they mainly test the availability of the '/app' and the '/admin' route.

#TDD

LoanController:
- Test the availability of the controller;
- Test the update for the preview loan request;

![alt tag](https://github.com/GustavoRSSilva/loan-app/blob/master/assets/app_tests.jpg)


##TODOs
- Create an enjoyable experience, the layouts are simple, too simple;
- Add an update loan option  (for admin);
- Add user roles (admin, user logged in, user anonymous);
- Hide the firebase configurations (here just for the test);
