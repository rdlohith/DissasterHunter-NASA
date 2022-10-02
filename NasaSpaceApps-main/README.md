# *Disaster Hunter*: Earthquake Activity Visualizer

1. How to Run *disaster hunter*
-----
You can download or clone the repository in to local storage and run the `index.html` in a webserver.

2. How To Use
-----
### Querying Earthquakes:
  * Tour the events using the bottom two arrow buttons. Change how you tour the earthquakes, either by magnitude or time by selecting the color mode in the controls menu.
  * Use the 'from' and 'to' calendar fill-ins to change the date range of the earthquakes visualized.
  * The magnitude slider allows you to filter how large the earthquakes being visualized are.
  * Use the 'draw' function to draw rectangles or circles to geographically constrain the query on earthquake events.
  * Search a radius of a specific location. Try Kodiak, Alaska! (57.7900, -152.4072)
  * The app should automatically generate a visualization of earthquake event hypocenters.
  * The reset button reverts the earthquakes displayed to the initial query.
  * Browse through the statistics of your query in the right hand side information and graphs panel. Magnitude and depth histograms, as well an earthquake activity time series graphs are all automatically generated from your query.
  * You can download these graphs by clicking the camera icon in the upper right hand corner of the graph plot area.

### Visualization of subsurface features:
Try a geographically constrained query along a subduction zone or fault line (These are represented by the brown lines).
  * Set a specific sector of the planet to query earthquakes within.
  * Visualize a longer period of earthquakes (>20 years) and within the magnitude range M3-10.
  * Use the canvas controls (in the bottom left-hand corner) to change the angle of viewing. This should provide a great visualization of how the tectonic plates interact with one another, whether in a subduction zone, transform fault, rift zone, or a hotspot.

### Performance Tips:
* If the earthquakes are not loading immediately after you enter search parameters, it may be loading.
Look in the "Globe Options" to see if the "earthquakes" layer is loading. If the search involves in
excess of 5000 earthquakes, the load may take a while.
* If you continually run into performance issues, consider using
  Google Chrome or Apple Safari to run the web app.
* Try removing the tectonic plate layer for improved browsing speeds in the app.
* Consider limiting the earthquake event search to less than 2000 events for quicker load times
* For larger queries, the performance greatly improves if searches are geographically constrained. To
        do this, use the drawing tool to limit where earthquakes are shown.

