# vuejs-magnifier
A simple VueJS component for image magnifying / product zooming

## Demo
For a demo, please visit here: https://codepen.io/ali-sharafi/full/OJPLJgP

## Installation
**Npm:**

```shell
$ npm i vuejs-magnifier
```

## Live Playground

To run that demo on your own computer:

* Clone this repository
* `npm install`
* `npm run build` 
* `npm run storybook` 
* Visit `http://localhost:9001/`

## Usage

```html
  <!-- Vue Component -->
  <template>
    <magnifier 
    src="/uploads/pic_url" 
    :glass-width="50" 
    :glass-height="50"
    :width="450"
    :height="500"
    :zoom-level="3"
    />

  </template>

  <script>
    import Vue from 'Vue'
    import Magnifier from 'vuejs-magnifier'

    Vue.use(Magnifier)

    export default {
      ...
      ...
    }
  </script>
```

## Development

Check out the `package.json`s script section. There are 2 scripts:

- `npm run dev` - it will open browser and you can *play* with code
- `npm run build` - it will craete a module file in `production` mode 
