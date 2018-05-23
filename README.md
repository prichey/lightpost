## Lightpost

A tiny employee directory for Postlight.

Live version here: [https://lightpost.prichey.net/](https://lightpost.prichey.net/).

### Features

* An Express backend.
* A React frontend (bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and mostly styled with [https://github.com/styled-components/styled-components](https://github.com/styled-components/styled-components)).
* A sortable list of employees, including name, department, position, location, and start date, powered by [react-table](https://github.com/react-tools/react-table) and [react-datepicker](https://github.com/Hacker0x01/react-datepicker).
* The ability to add, update, and remove employees, using [react-modal](https://github.com/reactjs/react-modal).
* A simple local JSON database, powered by [lowdb](https://github.com/typicode/lowdb).

### Local Development

* At the root, run `npm install` then `npm run dev` to start a development server with [nodemon](https://github.com/remy/nodemon).
* `cd client && npm install` then `npm start` to install and start the React development server with live-reloading.
* To build, run `npm run build` from the client directory to generate an optimized bundle, which is served by the Express backend.

I'm happy to answer any questions about decisions I made here. I tried to be as thoughtful and intentional with my code here I would be with any other project. Thanks for the consideration!

### Notes
* I started and restarted the project several times before I had settled on an infrastructure. I was interested in building out a GraphQL backend, especially since this would be an opportunity to try out the newly released [Prisma](https://github.com/prismagraphql/prisma), but I decided on the admittedly boring but reliable REST backend for such a simple toy app.
* I was hoping to implement client-side routing, using the ubiquitous [react-router](https://github.com/ReactTraining/react-router), but bumped up against the time limit and figured I shouldn't go way overboard.
* I initially went with [react-virtualized](https://github.com/bvaughn/react-virtualized) for my table, which is probably more performant and scale and has more customizable features than react-table, but for this toy example, react-table was sufficient and came with better defaults for my needs. Filtering wouldn't have been that much more work to implement, but again I bumped up against the time limit and couldn't justify the time it'd take to do.
* I played around with a few CSS animation flourishes but never landed on anything that didn't seem like fluff. Maybe that would have been just fine in this situation, but I decided to keep the app fairly spartan and just round out the features.
* I didn't include a profile picture per account. It's the only field that was specifically mentioned in the spec as a recommendation, but I held out on it last and it got thrown on the chopping block of other features I would have liked to implement. I had the idea of generating different crops of the image (one full size for the add / edit page, and a thumbnail for the list, probably using [sharp](https://github.com/lovell/sharp)), then uploading to S3, but I just ran out of time.
