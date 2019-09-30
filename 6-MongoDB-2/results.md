## Task 1
How many records does each airline class have? Use $project to show result as:  
**{ class: "Z", total: 999 }**
<pre>
  <code>
    db.airlines.aggregate([
      {
        $group: {
          _id: "$class", 
          total: {
            $sum: 1
          }
        }
      }, 
      {
        $project: {
          class: "$_id", 
          total: "$total", 
          _id: 0
        }
      }
    ])
  </code>
</pre>  
<pre>
  <code>
    
  </code>
</pre>

## Task 2
What are the top 3 destination cities outside of the United States (destCountry field, not included) with the highest average passengers count? Show result as:  
 **{ "avgPassengers" : 2312.380, "city" : "Minsk, Belarus" }**
<pre>
  <code>
    db.airlines.aggregate([
      {
        $match: {
          destCountry: {$ne: "United States"}
        }
      },
      {
        $group: {
          _id: "$destCity", 
          avgPassengers: {
            $avg: "$passengers"
          }
        }
      },
      {
        $project: { 
          avgPassengers: "$avgPassengers",
          city: "$_id",
          _id: 0
        }
      },
      {
        $sort: {
          avgPassengers: -1,
        }
      },
      {
        $limit: 3
      }
    ])
  </code>
</pre>  
<pre>
  <code>
    
  </code>
</pre>

## Task 3
Which carriers provide flights to Latvia (destCountry)? Show result as one document:  
 **{"_id" : "Latvia", "carriers" : [ "carrier1", " carrier2", …] }**
<pre>
  <code>
    db.airlines.aggregate([
      {
        $match: {
          destCountry: "Latvia"
        }
      },
      {
        $group: {
          _id: "$destCountry", 
          carriers: {
            $addToSet: "$carrier"
          }
        }
      }
    ])
  </code>
</pre>  
<pre>
  <code>
    
  </code>
</pre>

## Task 4
What are the carriers which flue the most number of passengers from the United State to either Greece, Italy or Spain? Find top 10 carriers, but provide the last 7 carriers (do not include the
first 3). Show result as:  
 **{ "_id" : "<carrier>", "total" : 999}**
<pre>
  <code>
    db.airlines.aggregate([
      {
        $match: {
          originCountry: "United State",
          destCountry: {$in: [
            "Greece",
            "Italy",
            "Spain"
          ]}
        }
      },
      {
        $group: {
          _id: "$carrier", 
          total: {
            $sum: "$passengers"
          }
        }
      },
      {
        $sort: {
          total: -1,
        }
      },
      {
        $limit: 10
      },
      {
        $skip: 3
      }
    ])
  </code>
</pre>  
<pre>
  <code>
    
  </code>
</pre>

## Task 5
Find the city (originCity) with the highest sum of passengers for each state (originState) of the United States (originCountry). Provide the city for the first 5 states ordered by state alphabetically (you should see the city for Alaska, Arizona and etc). Show result as:  
**{
"totalPassengers" : 999, "location" : { "state" : "abc", "city" : "xyz"
} }**
<pre>
  <code>
    db.airlines.aggregate([
      {
        $match: {
          originCountry: "United States"
        }
      },
      {
        $group: {
          _id: {
            city: "$originCity", 
            state: "$originState"
          },
          totalPassengers: {
            $sum: "$passengers"
          }
        }
      },
      {
        $sort: {
          "_id.state": 1,
          totalPassengers: -1,
        }
      },
      {
        $group: {
          _id: "$_id.state",
          city: {
            $first: "$_id.city"
          },
          maxPassengers: {
            $first: "$totalPassengers"
          }
        }
      },
      {
        $sort: {
          "_id": 1,
        }
      },
      {
        $project: { 
          totalPassengers: "$maxPassengers",
          location: {
            state: "$_id",
            city: "$city"
          },
          _id: 0
        }
      },
      {
        $limit: 5
      }
    ])
  </code>
</pre>  
<pre>
  <code>
    
  </code>
</pre>

