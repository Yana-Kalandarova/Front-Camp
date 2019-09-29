## Task 3.1
How many “Chinese” (cuisine) restaurants are in “Queens” (borough)?  
<pre>
  <code>
    > db.restaurants.find({cuisine: "Chinese", borough: "Queens"}).count()
  </code>
</pre>  
<pre>
  <code>
    728
  </code>
</pre>

## Task 3.2
What is the _id of the restaurant which has the grade with the highest ever score?  
<pre>
  <code>
    > db.restaurants.find({}, {restaurant_id: 1}).sort({"grades.score": -1}).limit(1)
  </code>
</pre>
<pre>
  <code>
    { "_id" : ObjectId("5d907c4aa686f51947061aec"), "restaurant_id" : "40372466" }
  </code>
</pre>

## Task 3.3
Add a grade { grade: "A", score: 7, date: ISODate() } to every restaurant in “Manhattan” (borough). 
<pre>
  <code>
    > db.restaurants.updateMany({borough: "Manhattan"}, {$push: {grades: {grade: "A", score: 7, date: ISODate()}}})
  </code>
</pre>
<pre>
  <code>
    { "acknowledged" : true, "matchedCount" : 10259, "modifiedCount" : 10259 }
  </code>
</pre>

## Task 3.4
What are the names of the restaurants which have a grade at index 8 with score less then 7? Use projection to
include only names without _id.
<pre>
  <code>
    > db.restaurants.find({"grades.8.score": {$lt: 7}}, {name: 1, _id: 0})
  </code>
</pre>
<pre>
  <code>
    { "name" : "Silver Krust West Indian Restaurant" }
    { "name" : "Pure Food" }
  </code>
</pre>

## Task 3.5
What are _id and borough of “Seafood” (cuisine) restaurants which received at least one “B” grade in period from
2014-02-01 to 2014-03-01? Use projection to include only _id and borough. 
<pre>
  <code>
    > db.restaurants.find({cuisine: "Seafood", grades: {$elemMatch: {grade: "B", date: {$gt: ISODate("2014-02-01"), $lt: ISODate("2014-03-01")}}}}, {borough: 1, _id: 1})
  </code>
</pre>
<pre>
  <code>
    { "_id" : ObjectId("5d907c4ba686f51947064eeb"), "borough" : "Bronx" }
    { "_id" : ObjectId("5d907c4ba686f51947065162"), "borough" : "Manhattan" }
  </code>
</pre>

## Task 4.1
Create an index which will be used by this query and provide proof (from explain() or Compass UI) that the index is indeed used by the winning plan:  
**> db.restaurants.find({ name: "Glorious Food" })** 
<pre>
  <code>
    > db.restaurants.createIndex({name: 1})
  </code>
</pre>
![Task 4.1](img/4.1.png "Task 4.1")

##Task 4.2
Drop index from task 4.1  
<pre>
  <code>
    > db.restaurants.dropIndex({name: 1})
  </code>
</pre>  
<pre>
  <code>
    { "nIndexesWas" : 2, "ok" : 1 }
  </code>
</pre>

##Task 4.3
Create an index to make this query covered and provide proof (from explain() or Compass UI) that it is indeed covered:  
**> db.restaurants.find({ restaurant_id: "41098650" }, { _id: 0, borough: 1 })**  
<pre>
  <code>
    > db.restaurants.createIndex({restaurant_id: 1, borough: 1})
  </code>
</pre>  
![Task 4.3](img/4.3.png "Task 4.3")

##Task 4.4
Create a partial index on cuisine field which will be used only when filtering on borough equal to “Staten Island”:
  **db.restaurants.find({ borough: "Staten Island", cuisine: "American" }) – uses index**
  **db.restaurants.find({ borough: "Staten Island", name: "Bagel Land" }) – does not use index**
  **db.restaurants.find({ borough: "Queens", cuisine: "Pizza" }) – does not use index**
<pre>
  <code>
    > db.restaurants.createIndex({cuisine: 1}, {partialFilterExpression: {borough: {$eq: 'Staten Island'}}})
  </code>
</pre> 
![Task 4.4-1](img/4.4-1.png "Task 4.4-1")
![Task 4.4-2](img/4.4-2.png "Task 4.4-2")
![Task 4.4-3](img/4.4-3.png "Task 4.4-3")
