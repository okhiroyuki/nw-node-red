# nw-node-red

This is an NW.js template to embed Node-RED with an existing Node-RED project to create a native application.

## Configuring the project for building

This project uses the nwjs-builder-phoenix project to help build native versions of Node-RED applications, so please read and become familiar with their [documentation](https://github.com/evshiron/nwjs-builder-phoenix) as some basic knowledge is assumed.

```
# Clone this repository
git clone https://github.com/okhiroyuki/nw-node-red.git
# Go into the repository
cd nw-node-red
# Install project dependencies
npm i
```

## Building local runtime

You should then be able to run

```
npm run dist
```

Runtimes are created in the dist directory under the nw-node-red project.

## Building for other platforms

TODO

## Developing and Testing - Running locally

While developing and testing you can just run your app locally by running

```
npm start
```

from within the project folder.
