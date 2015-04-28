Kanban AWD API - HTML Hypermedia API and Adaptive Web Design
======

This is an implementation of a Kanban board that is both
 - an HTML Hypermedia API
 - a multi-device web app, using Content First and "agressive enhancement"

Two running instances of this code is found at http://kanban-awd.herokuapp.com/ and http://kanban-api.herokuapp.com. They share the same database.

Some more general information regarding HTML Hypermedia APIs and Adaptive Web Design is found at https://github.com/gustafnk/combining-html-hypermedia-apis-and-adaptive-web-design

Feel free to contact me on twitter: http://twitter.com/gustaf_nk

Summary
------
  - Run the app on port 3001 or specified "api" hostname to strip CSS/JavaScript includes and non-microformats classes.
  - The web app has three different main layouts - i.e. go to 'working' and zoom in and out to see them in action.
  - The 'working' and 'done' states have a pull function, making 'backlog' and 'verify' feel more like queues.
  - This is a rails app. Run `bundle install` (you need to have Postgres installed) and then `rails server`
