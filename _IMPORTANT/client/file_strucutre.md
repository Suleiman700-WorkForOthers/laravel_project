
# Client File Structure

```bash
├── public
│   ├── js
│   │   ├── classes
│   │   │   ├── Customers.js
│   │   ├── helpers
│   │   │   ├── http.js
│   │   │   ├── loader.js
│   │   │   ├── popups.js
│   │   │   ├── text_formatter.js
│   │   ├── plugins
│   │   │   ├── element-manager
│   │   │   │   ├── Button_Manager.js
│   │   │   │   ├── Input_Manager.js
│   │   │   │   ├── Select_Manager.js
│   │   │   ├── events
│   │   │   │   ├── event_bus
│   │   │   │   │   ├── Event_Bus.js
│   │   │   ├── sweetalert
│   │   │   │   ├── sweetalert2@11.js
│   │   │   ├── table
│   │   │   │   ├── Table.js
│   │   │   │   ├── Vertical_Table.js
│   │   ├── views
│   │   │   ├── welcome
│   │   │   │   ├── elements.js
│   │   │   │   ├── events.js
│   │   │   │   ├── init.js
```

---

## Classes description

### Customers.js

This class is responsible for fetching customer data from the server.

---

## Helpers description

### http.js

This class is responsible for making HTTP requests to the server.

### loader.js

This class is responsible for showing and hiding loading overlays.

### popups.js

This class is responsible for showing popups.

### text_formatter.js

This class is responsible for formatting text.

---

## Plugins description

### element-manager

This plugin is responsible for managing HTML elements.

### events

This plugin is responsible for handling events (a.k.a `event bus`).

### sweetalert

This plugin is responsible for showing sweetalert.

### table

This plugin is responsible for creating tables and rendering them in a developer-friendly way.

---

## Views description

### welcome

This directory contains all the scripts related to the welcome page.

### elements.js

This file contains all the elements that are managed by the plugin `element-manager` and are used in the welcome page.

### events.js

This file contains all the events that are used in the welcome page.

### init.js

This file contains all the initialization code for the welcome page.