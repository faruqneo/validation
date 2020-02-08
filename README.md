
# API List

 All api's are persent in routers folder.

## API for signin in this application

 It is a default path where admin can login into application.

POST `/signin`

   `{
      email: xxxxx@marmeto.com, 
      password: xxxxx
   }`


## API for signup in this application

 It is a path where a person can singup into this application.

POST `/signup`

   `{
      name: xxxxx, 
      email: xxxxx@marmeto.com, 
      password: xxxxxx, 
      password2: xxxxxx
   }`

## API'S for slip.

 It is an api in which admin can upload salary slip of a perticular user. Here basically we stores slip on AWS s3 bucket then it's location on db.

POST `/slipUpload`

   `{
      id: userid, 
      name: xxxx, 
      email: xxxx, 
      file.path: sysgenerated, 
      date: date_of_slip
   }`

 It is an api in which a user can get there last month slip details.   

GET `/slip/:userId`

 It is an api in which a user can get there all month slips details.

GET `/slipAllMonth/:userId`

## API'S for support.

 It is an api in which an admin can send a mail to anyone.

POST `/supportMail`

   `{
      user_id: userId, 
      from: currentUser, 
      to: xxxxx@marmeto.com, 
      subject: subject, 
      text: body
   }`

 Here admin can send reply to any email which is send to him/her.

POST `/reply`

   `{
      body: body
   }`

 Here can any user send email/message to admin and he/she will get message id and all other details.

POST `/supportEmail`

`{
   user_id: user_id, 
   from: from, 
   subject: subject, 
   text: text
}`

 Here a user can check whether admin sent any reply or not

GET `/emailReply/:emailId`