---
title: React unit testing with Jest and Enzyme
date: 2020-12-01 16:47:25
author: Abhishek Rana
category: Web
tags:
  - React
  - Javascript
  - Testing
  - Jest
  - Enzyme
  - NAYAN
  - India
---

![React unit testing](/blog/Web/react-unit-test/banner.jpeg)

I don’t think I even have to inform you the importance of unit testing your code, so i’ll dive in on to unit testing with Jest and Enzyme.

First of all what are Jest and Enzyme? [Jest](https://jestjs.io/) was created by Facebook and may be a testing framework to check javascript and React code. along side Airbnb’s [Enzyme](https://enzymejs.github.io/enzyme/index.html), which may be a testing utility, makes it the right match to simply test your React application.
Snapshots to the rescue

Let’s begin easy with testing an easy pure stateless (a.k.a. dumb) component which renders an easy link element containing a title and an url.
```
import React from 'react';
import { string } from 'prop-types';
const Link = ({ title, url }) => <a href={url}>{title}</a>;
Link.propTypes = {
  title: string.isRequired,
  url: string.isRequired
};
export default Link;
```

We want to check this component by checking if the properties are coming in right and if it’s rendered correctly. With Jest we've a really easy thanks to do that by creating snapshots. the primary time when running the test a snapshot is made . you'll then check out the created file to see whether this rendered component matches your required outcome. Let’s write the primary test for our component. during this case we’re gonna use the [shallow](https://enzymejs.github.io/enzyme/docs/api/shallow.html) renderer of Enzyme to assist us creating the snapshot.
```
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Link from './Link';
describe('Link', () => {
  it('should render correctly', () => {
    const output = shallow(
      <Link title="mockTitle" url="mockUrl" />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
```

After running the tests, Jest will automaticly create a `__snapshots__` directory and a snapshot file containing the outcome of the test. In this case it creates a `Link-spec.js.snap` file containing the subsequent outcome of the rendering of our component.
```
// Jest Snapshot v1, https://goo.gl/fbAQLP
exports[`Link should render correctly 1`] = `
<a
  href="mockUrl"
>
  mockTitle
</a>
`;
```


### Simulating events
Let’s update our component by adding click event-listener. This also means we've to rewrite our component to the category notation as we are getting to bind the click event function to the component. Which can be done by creating a function inside your component.
```
import React, { Component } from 'react';
import { string } from 'prop-types';
class Link extends Component {
  handleClick() => {
    alert('clicked!');
  };
  render() {
    const { title, url } = this.props;
    return <a href={url} onClick={this.handleClick}>{title}</a>;
  }
}
```

When you run our previous test at this moment, it'll fail as your saved snapshot doesn’t match the new snapshot because we added the onClick property. If the snapshot looks correctly, you'll easily update it by pressing u. The snapshot will now look like:
```
exports[`Link should render correctly 1`] = `
<a
  href="mockUrl"
  onClick={[Function]}
  target=""
>
  mockTitle
</a>
`;
```

We are going to create a another test case to check whether the onClick event is being handled or not. Our click events triggers an alert message and we can mock this functionality in Jest testing library by using [jest.fn()](https://jestjs.io/docs/en/jest-object). After rendering our component we’re trying to simulate a click event and check if the alert is called with the correct message. (In this case no snapshot is created, as we don’t use the snapshot feature)
```
it('should handle the click event', () => {
  window.alert = jest.fn();
  const output = shallow(
    <Link title="mockTitle" url="mockUrl" />
  );
  output.simulate('click');
  expect(window.alert).toHaveBeenCalledWith('clicked');
});
```

### Testing the state
We can also test the state of the component. Update the component by adding the state in the constructor and expanding the click listener with the setState method. When clicking on the button, we’re now also going to modulate the clicked state from false to true.
```
class Link extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }
  handleClick = () => {
    alert('clicked');
    this.setState({ clicked: true });
  }
  ...
}
```

Let’s create a another test where we render the output and verify the state. The first time we check the click state property should be false. After a click the state should be changed to true.
```
it('should handle state changes', () => {
  const output = shallow(
    <Link title="mockTitle" url="mockUrl" />
  );
  
  expect(output.state().clicked).toEqual(false);
  output.simulate('click');
  expect(output.state().clicked).toEqual(true);
});
```

### The art of mocking
One of the pros of Jest is the ease of creating all different kind of mocks. We already used jest.fn() in one of unit tests which is a simple mock method that returns a value, but you can also mock entire files as a whole.

> If you are not mocking, you are not unit testing!

The simplest way to mock files is using the jest.mock method which automatically mocks the file by returning mocked methods. Let try to mock react and react-dom and check whether the render method has been called.
```
import React from 'react';
import { render } from 'react-dom';
import Link from './Link';
jest.mock('react-dom');
describe('Link', () => {
  it('should render correctly', () => {
    expect(render).toHaveBeenCalledWith(
      <Link title="mockTitle" url="mockUrl" />, 'element-node'
    );
    expect(render).toHaveBeenCalledTimes(1);
  });
});
```

We create a test like we would normally do, but adding the jest.mock line. Now the render method of react is a mock method which returns a valye which we can now use in our test to verify whether it has been used with the correct properties or not.

When you do not want Jest to automatically create mock methods of your file, you can easily create a mock file for yourself. Just create a `__mocks__` directory and add the to be mock file in there. Now Jest will use that file when you call jest.mock in your unit tests. For the react example, create react-dom.js file which returns the render value function.
```
export default {
  render: jest.fn(),
};
```

In our example we’re returning a value method on which we can verify whether it is correct, but your value could also return values or implementations rather than single value.
```
render: jest.fn().mockReturnValue('component is rendered'),
render: jest.fn().mockImplementation(() => 'mock implementation'),
```

### Roundup
So these are very simple techiniques of unit testing your application using Jest and Enzyme in React applications. Both have good online documentation, start from here and you can create your unit test in a fast and efficient!

There is no reason to not start testing today ;)

## References
1. [Jest](https://jestjs.io/)
2. [Enzyme](https://enzymejs.github.io/enzyme/index.html)

## Some good reads you may like
1. [React CI/CD](https://nayan.co/blog/Web/react-cicd/)
2. [Angular Youtube integration](https://nayan.co/blog/Web/angular-youtube/)
3. [Angular maps and clusters](https://nayan.co/blog/Web/angular-maps/)
