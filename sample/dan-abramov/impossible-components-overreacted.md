```yaml
title: Impossible Components — overreacted
author: Dan Abramov
tags:
  - React
  - Server Components
  - Client Components
  - Frontend
  - Backend
  - JavaScript
  - Web Development
  - React Server Components
```

Suppose I want to greet you in _my_ favorite color.

This would require combining information from two different computers. Your name would be coming from _your_ computer. The color would be on _my_ computer.

You could imagine a component that does this:

```
import { useState } from 'react';
import { readFile } from 'fs/promises';
 
async function ImpossibleGreeting() {
  const [yourName, setYourName] = useState('Alice');
  const myColor = await readFile('./color.txt', 'utf8');
  return (
    <>
      <input placeholder="What's your name?"
        value={yourName}
        onChange={e => setYourName(e.target.value)}
      />
      <p style={{ color: myColor }}>
        Hello, {yourName}!
      </p>
    </>
  );
}
```

But this component is impossible. The `readFile` function can only execute on _my_ computer. The `useState` will only have a useful value on _your_ computer. We can’t do both at once without giving up the predictable top-down execution flow.

Or can we?

* * *

### [Splitting a Component](https://overreacted.io/impossible-components/#splitting-a-component)

Let’s split this component in two parts.

The _first_ part will read the file, which only makes sense on _my_ computer. It is responsible for loading data so we’re going to call this part `GreetingBackend`:

```
import { readFile } from 'fs/promises';
import { GreetingFrontend } from './client';
 
async function GreetingBackend() {
  const myColor = await readFile('./color.txt', 'utf8');
  return <GreetingFrontend color={myColor} />;
}
```

It will read my chosen color and pass it as the `color` prop to the second part, which is responsible for interactivity. We’re going to call it `GreetingFrontend`:

```
'use client';
 
import { useState } from 'react';
 
export function GreetingFrontend({ color }) {
  const [yourName, setYourName] = useState('Alice');
  return (
    <>
      <input placeholder="What's your name?"
        value={yourName}
        onChange={e => setYourName(e.target.value)}
      />
      <p style={{ color }}>
        Hello, {yourName}!
      </p>
    </>
  );
}
```

That second part receives that `color`, and returns an interactive form. Edit “Alice” to say your name and notice how the greeting updates as you’re typing:

Hello, Alice!

(If your name _is_ Alice, you may leave it as is.)

**Notice that _the backend runs first._ Our mental model here isn’t “frontend loads data from the backend”. Rather, it’s “the backend passes data _to_ the frontend”.**

This is React’s top-down data flow, but including the backend _into_ the flow. The backend is the source of truth for the data—so it [must be](https://react.dev/learn/thinking-in-react#step-4-identify-where-your-state-should-live) the frontend’s _parent_.

Have another look at these two parts and see how the data flows _down:_

```
import { readFile } from 'fs/promises';
import { GreetingFrontend } from './client';
 
async function GreetingBackend() {
  const myColor = await readFile('./color.txt', 'utf8');
  return <GreetingFrontend color={myColor} />;
}
```

```
'use client';
 
import { useState } from 'react';
 
export function GreetingFrontend({ color }) {
  const [yourName, setYourName] = useState('Alice');
  return (
    <>
      <input placeholder="What's your name?"
        value={yourName}
        onChange={e => setYourName(e.target.value)}
      />
      <p style={{ color }}>
        Hello, {yourName}!
      </p>
    </>
  );
}
```

From the backend to the frontend. From my computer to yours.

Together, they form a single, _encapsulated_ abstraction spanning both worlds:

```
<GreetingBackend />
```

Hello, Alice!

Together, they form an impossible component.

_(Here and below, the `'use client'` syntax hints that we’ll be learning React Server Components. You can try them in [Next](https://nextjs.org/)—or in [Parcel](https://parceljs.org/recipes/rsc/) if you don’t want a framework.)_

* * *

### [Local State, Local Data](https://overreacted.io/impossible-components/#local-state-local-data)

The beautiful thing about this pattern is that I can refer to the _entirety_ of this functionality—_its both sides_—by writing a JSX tag just for the “backend” part. Since the backend _renders_ the frontend, rendering the backend gives you both.

To demonstrate this, let’s render `<GreetingBackend>` multiple times:

```
<>
  <GreetingBackend />
  <GreetingBackend />
  <GreetingBackend />
</>
```

Hello, Alice!

Hello, Alice!

Hello, Alice!

Verify that you can edit each input independently.

Naturally, the `GreetingFrontend` _state_ inside of each `GreetingBackend` is isolated. However, how each `GreetingBackend` _loads its data_ is also isolated.

To demonstrate this, let’s edit `GreetingBackend` to take a `colorFile` prop:

```
import { readFile } from 'fs/promises';
import { GreetingFrontend } from './client';
 
async function GreetingBackend({ colorFile }) {
  const myColor = await readFile(colorFile, 'utf8');
  return <GreetingFrontend color={myColor} />;
}
```

Next, let’s add `Welcome` that renders `GreetingBackend` for different color files:

```
import { readFile } from 'fs/promises';
import { GreetingFrontend } from './client';
 
function Welcome() {
  return (
    <>
      <GreetingBackend colorFile="./color1.txt" />
      <GreetingBackend colorFile="./color2.txt" />
      <GreetingBackend colorFile="./color3.txt" />
    </>
  );
}
 
async function GreetingBackend({ colorFile }) {
  const myColor = await readFile(colorFile, 'utf8');
  return <GreetingFrontend color={myColor} />;
}
```

Let’s see what happens:

```
<Welcome />
```

Each greeting will read its own file. And each input will be independently editable.

Hello, Alice!

Hello, Alice!

Hello, Alice!

This might remind you of composing “server partials” in Rails or Django, except that instead of HTML you’re rendering fully interactive React component trees.

Now you can see the whole deal:

1.  **Each `GreetingBackend` _knows_ how to load its own data.** That logic is encapsulated in `GreetingBackend`—you didn’t need to coordinate them.
2.  **Each `GreetingFrontend` _knows_ how to manage its own state.** That logic is encapsulated in `GreetingFrontend`—again, no manual coordination.
3.  **Each `GreetingBackend` renders a `GreetingFrontend`.** This lets you think of `GreetingBackend` as a self-contained unit that does _both_—an impossible component. It’s a piece of the backend _with its own_ piece of the frontend.

Of course, you can substitute “reading files” with “querying an ORM”, “talking to an LLM with a secret API key”, “hitting an internal microservice”, or anything that requires backend-only resources. Likewise, an “input” represents any interactivity. The point is that you can compose both sides into self-contained components.

Let’s render `Welcome` again:

```
<Welcome />
```

Hello, Alice!

Hello, Alice!

Hello, Alice!

Notice how we didn’t need to plumb any data or state into it.

The `<Welcome />` tag is completely self-contained!

And because the backend parts always _run first_, when you load this page, from the frontend’s perspective, the data is “already there”. There are no flashes of “loading data from the backend”—the backend _has already passed_ the data to the frontend.

Local state.

Local data.

Single roundtrip.

_Self-contained._

* * *

### [It’s Not About HTML](https://overreacted.io/impossible-components/#its-not-about-html)

Okay, but how is this different from just rendering a bunch of HTML?

Let’s tweak the `GreetingFrontend` component to do something different:

```
import { readFile } from 'fs/promises';
import { GreetingFrontend } from './client';
 
async function GreetingBackend() {
  const myColor = await readFile('./color.txt', 'utf8');
  return <GreetingFrontend color={myColor} />;
}
```

```
'use client';
 
import { useState } from 'react';
 
export function GreetingFrontend({ color }) {
  const [yourName, setYourName] = useState('Alice');
  return (
    <>
      <input placeholder="What's your name?"
        value={yourName}
        onChange={e => setYourName(e.target.value)}
        onFocus={() => {
          document.body.style.backgroundColor = color;
        }}
        onBlur={() => {
          document.body.style.backgroundColor = '';
        }}
      />
      <p>
        Hello, {yourName}!
      </p>
    </>
  );
}
```

Instead of styling `<p>`, we’ll set `document.body.style.backgroundColor` to the `color` from the backend—but only for as long as the input is focused.

Try typing into the input:

Hello, Alice!

Depending on how you look at it, the fact that this “just works” can seem either completely natural, or a total surprise, or a bit of both. The backend is passing props to the frontend, but _not for the purpose of generating the initial HTML markup._

The props are being used _later_—in order to “do something” in the event handler.

```
'use client';
 
import { useState } from 'react';
 
export function GreetingFrontend({ color }) {
  // ...
  return (
    <>
      <input placeholder="What's your name?"
        // ...
        onFocus={() => {
          document.body.style.backgroundColor = color;
        }}
        // ...
      />
      ...
    </>
  );
}
```

Of course, we’re not limited to passing colors. We could pass strings, numbers, booleans, objects, pieces of JSX—anything that can be sent over the wire.

Now let’s try rendering `<Welcome />` again which composes our components:

```
import { readFile } from 'fs/promises';
import { GreetingFrontend } from './client';
 
function Welcome() {
  return (
    <>
      <GreetingBackend colorFile="./color1.txt" />
      <GreetingBackend colorFile="./color2.txt" />
      <GreetingBackend colorFile="./color3.txt" />
    </>
  );
}
 
async function GreetingBackend({ colorFile }) {
  const myColor = await readFile(colorFile, 'utf8');
  return <GreetingFrontend color={myColor} />;
}
```

Notice how each greeting now has the new behavior but remains independent:

Hello, Alice!

Hello, Alice!

Hello, Alice!

Local data, local state.

Nothing conflicts with each other. No global identifiers, no naming clashes. Any component can be reused anywhere in the tree and will remain self-contained.

_Local, therefore composable._

Now that you get the idea, let’s have some fun with it.

* * *

### [A Sortable List](https://overreacted.io/impossible-components/#a-sortable-list)

Imagine another _impossible_ component—a sortable file list.

```
import { useState } from 'react';
import { readdir } from 'fs/promises';
 
async function SortableFileList({ directory }) {
  const [isReversed, setIsReversed] = useState(false);
  const files = await readdir(directory);
  const sortedFiles = isReversed ? files.toReversed() : files;
  return (
    <>
      <button onClick={() => setIsReversed(!isReversed)}>
        Flip order
      </button>
      <ul>
        {sortedFiles.map(file =>
          <li key={file}>
            {file}
          </li>
        )}
      </ul>
    </>
  );
}
```

Of course, this doesn’t make sense. The information `readdir` needs only exists on _my_ computer but the sorting order you choose with `useState` lives on _your_ computer. (The most I _could_ do on mine is to prepare HTML for the initial state.)

How do we fix this component?

By now, you know the drill:

```
import { SortableList } from './client';
import { readdir } from 'fs/promises';
 
async function SortableFileList({ directory }) {
  const files = await readdir(directory);
  return <SortableList items={files} />;
}
```

```
'use client';
 
import { useState } from 'react';
 
export function SortableList({ items }) {
  const [isReversed, setIsReversed] = useState(false);
  const sortedItems = isReversed ? items.toReversed() : items;
  return (
    <>
      <button onClick={() => setIsReversed(!isReversed)}>
        Flip order
      </button>
      <ul>
        {sortedItems.map(item => (
          <li key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
```

Let’s try it:

```
<SortableFileList directory="." />
```

*   client.js
*   color.txt
*   color1.txt
*   color2.txt
*   color3.txt
*   components.js
*   index.md
*   server.js

So far so good. Now notice that the `items` being passed down is an array. We’re already using that to conditionally reverse it. What else could we do with an array?

* * *

### [A Filterable List](https://overreacted.io/impossible-components/#a-filterable-list)

It would be nice if we could filter the list of files with an input. Filtering must happen on _your_ machine (the most I could do on _mine_ is to generate HTML for the initial state). Therefore, it makes sense to add the filter logic to the frontend part:

```
import { SortableList } from './client';
import { readdir } from 'fs/promises';
 
async function SortableFileList({ directory }) {
  const files = await readdir(directory);
  return <SortableList items={files} />;
}
```

```
'use client';
 
import { useState } from 'react';
 
export function SortableList({ items }) {
  const [isReversed, setIsReversed] = useState(false);
  const [filterText, setFilterText] = useState('');
  let filteredItems = items;
  if (filterText !== '') {
    filteredItems = items.filter(item =>
      item.toLowerCase().startsWith(filterText.toLowerCase())
    );
  }
  const sortedItems = isReversed ? filteredItems.toReversed() : filteredItems;
  return (
    <>
      <button onClick={() => setIsReversed(!isReversed)}>
        Flip order
      </button>
      <input
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {sortedItems.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
```

Notice how the backend part only executes once—since my blog is static, it runs during deployment. But the frontend logic is reactive to your every keystroke:

*   client.js
*   color.txt
*   color1.txt
*   color2.txt
*   color3.txt
*   components.js
*   index.md
*   server.js

And because it’s a reusable component, I can point it at some other data source:

```
<SortableFileList directory="./node_modules/react/" />
```

*   LICENSE
*   README.md
*   cjs
*   compiler-runtime.js
*   index.js
*   jsx-dev-runtime.js
*   jsx-dev-runtime.react-server.js
*   jsx-runtime.js
*   jsx-runtime.react-server.js
*   package.json
*   react.react-server.js

What we’ve got here is, again, a self-contained component that can load its own data on the backend and hand it off to the frontend for client-side interactivity.

Let’s see how far we can push this.

* * *

### [An Expanding Preview](https://overreacted.io/impossible-components/#an-expanding-preview)

Here’s a little `PostPreview` component for my blog:

```
import { readFile } from 'fs/promises';
import matter from 'gray-matter';
 
async function PostPreview({ slug }) {
  const fileContent = await readFile('./public/' + slug + '/index.md', 'utf8');
  const { data, content } = matter(fileContent);
  const wordCount = content.split(' ').filter(Boolean).length;
 
  return (
    <section className="rounded-md bg-black/5 p-2">
      <h5 className="font-bold">
        <a href={'/' + slug} target="_blank">
          {data.title}
        </a>
      </h5>
      <i>{wordCount.toLocaleString()} words</i>
    </section>
  );
}
```

It looks like this:

```
<PostPreview slug="jsx-over-the-wire" />
```

##### [JSX Over The Wire](https://overreacted.io/jsx-over-the-wire)

_11,212 words_

Isn’t it neat how it loads its own data? (Or rather, how the data is _already there_?)

Now let’s say I want to add a little interaction to it. For example, let’s say that I want the card to expand on click so that it displays the first sentence of the post.

Getting the first sentence on the backend is pretty easy:

```
async function PostPreview({ slug }) {
  const fileContent = await readFile('./public/' + slug + '/index.md', 'utf8');
  const { data, content } = matter(fileContent);
  const wordCount = content.split(' ').filter(Boolean).length;
  const firstSentence = content.split('.')[0];
  const