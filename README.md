# VRILLAR TEST
According to the test, I have prepare the following APIs that match what the exam required:

# Set up
+ open the project and run npm i
+ run npm run build to compile ts file
+ run npm run dev and use http://localhost:8800 to access to APIs

# Get race result APIS
1/ Create 3 basic get API that simply get race's data from database 
base on the following category:

+ Races: get specific race using http://localhost:8800/api/races/:grandPrix
(example: http://localhost:8800/api/races/Spain)

+ Driver: this api require category Driver or Team to indicate specific driver or team 
http://localhost:8800/api/drivers/:category/:id
(example: http://localhost:8800/api/drivers/Driver/Max Verstappen)
 
+ Year: get race info base on which year it took place using 
http://localhost:8800/api/years/:year 
(example: http://localhost:8800/api/years/2022)

+ Ranking: get yearly ranking race base on which year and other three catergory
race, driver and team
http://localhost:8800/api/years/ranking/:year/:category 
(example: http://localhost:8800/api/years/ranking/2022/race)

+ Search: get race info base on query search, the search string can be incomplete  
http://localhost:8800/api/search/:search
(example McLaren Mercedes team name can be search with: http://localhost:8800/api/search/McLaren Mer)

+ All: get all race info   
http://localhost:8800/api/all

2/ All APIs except for Search, can be filter with skip, limit and year.
Example: http://localhost:8800/api/drivers/Team/Mercedes?year=2022&limit=10&skip=2
