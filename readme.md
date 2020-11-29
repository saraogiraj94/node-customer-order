## Overview

This application is in Nodejs with ExpressJs as framework, and consist of REST APIs for creating/managing customer purchases.
The design pattern followed her is MVC(Models,Views and Controller), as this only contains apis, It consist of backend part only. 

Models
1) Customer model which contains detail about customer.
2) Purchase model which contains detail about purchases of the customer.
--------------------------------------------------------

## Setup steps
1 Download and Run MongoDB and then set properties like host,port and db in env file, refer to example.env.

2 Clone the repository.

3 npm install

4 npm start

Note**

1 Before installing you need to have Nodejs and npm install.

2 You can use the official docker image of mongodb and start that in docker container by using the command 'docker pull mongo'. 

--------------------------------------------------------

## Assumptions

1) Properties like Brand are assumed to be a string, and we assume that the user will share the same name for the same brand and if the string changes new brand will be created like 'OnePlus' and 'One Plus' will be treated as two different brands.The same goes with category property.

2) Brand name and logo from the input will always send the same by the user in API call, if this is not the case we may lend into a place where one brand may have multiple logos. No such check is currently kept.

3) We assumed location to be string which may be a city name like Sydney for simplicity, in real world location is itself an entity and may have attributes like office, street, city, country, type of store (Online,Offline) etc.

4) The app does not calculate the total amount of purchase by summing up the purchase amount of individual items of the purchase as it may be possible that purchase amount may differ like may be taxes or discounts are added on total sum. So no such validations or checks are present.

5) In order to calculate brand reward/share we have kept a fixed 1 percent of the total purchase amount of brand, and this in real-world may vary between brand and the calculation of rewards can be more complex.

---------------------------------------------------------------------------

## What left to do

1 Currently the auth tokens are being saved in mongodb and token is fetched for each api call, which is not the best option, use of session store on caching techniques should be done in order to reduce latency. 

2 Adding more filter parameters and conditions like $gt,$lt,$eq or more and even cross filters functionality like $or,$and.

3 Adding more sorting parameters. 

4 Creating Indexes in mongodb for faster query response based on the read pattern of usage.

5 Dockerizing the application.