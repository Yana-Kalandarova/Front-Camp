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
    { "class" : "P", "total" : 5683 }
    { "class" : "L", "total" : 23123 }
    { "class" : "G", "total" : 17499 }
    { "class" : "F", "total" : 140343 }
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
    { "avgPassengers" : 8052.380952380952, "city" : "Abu Dhabi, United Arab Emirates" }
    { "avgPassengers" : 7176.596638655462, "city" : "Dubai, United Arab Emirates" }
    { "avgPassengers" : 7103.333333333333, "city" : "Guangzhou, China" }
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
    { "_id" : "Latvia", "carriers" : [ "Blue Jet SP Z o o", "Uzbekistan Airways", "JetClub AG" ] }
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
          originCountry: "United States",
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
    { "_id" : "Compagnia Aerea Italiana", "total" : 280256 }
    { "_id" : "United Air Lines Inc.", "total" : 229936 }
    { "_id" : "Emirates", "total" : 100903 }
    { "_id" : "Air Europa", "total" : 94968 }
    { "_id" : "Meridiana S.p.A", "total" : 20308 }
    { "_id" : "Norwegian Air Shuttle ASA", "total" : 13344 }
    { "_id" : "VistaJet Limited", "total" : 183 }
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
    { "totalPassengers" : 760120, "location" : { "state" : "Alabama", "city" : "Birmingham, AL" } }
    { "totalPassengers" : 1472404, "location" : { "state" : "Alaska", "city" : "Anchorage, AK" } }
    { "totalPassengers" : 13152753, "location" : { "state" : "Arizona", "city" : "Phoenix, AZ" } }
    { "totalPassengers" : 571452, "location" : { "state" : "Arkansas", "city" : "Little Rock, AR" } }
    { "totalPassengers" : 23701556, "location" : { "state" : "California", "city" : "Los Angeles, CA" } }
  </code>
</pre>

