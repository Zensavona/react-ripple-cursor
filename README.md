# Ripple

Does exactly what you'd expect from the name, ripples around your cursor.

`yarn add react-ripple-cursor`

![alt Demo GIF](https://i.imgur.com/LTGj2NP.gif)

To affect your whole viewport, throw a `<Ripple />` anywhere in your React component, otherwise to affect only a smaller area, you can wrap that area in `<Ripple><YourComponent /></Ripple>`

There are some sensible defaults, but you can also set the `colour` (colour of the Ripple, RGB array), `size` (size the Ripple extends to, pixels), and `scope` (a specific element to bind to).

```JavaScript
import React from 'react'
import Ripple from 'react-ripple-cursor'

const YourComponent = () => (<div>
  <Ripple />

  // or

  <Ripple colour={[122, 222, 12]} size={80}>
    <SomeOtherComponent />
  </Ripple>
</div>)
```
