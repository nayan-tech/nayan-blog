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

I don’t think I have to tell you the importance of unit testing your code, so i’ll dive in directly to unit testing with Jest and Enzyme.

First of all what are Jest and Enzyme? [Jest](https://jestjs.io/) was created by Facebook and is a testing framework to test javascript and React code. Together with Airbnb’s [Enzyme](https://enzymejs.github.io/enzyme/index.html), which is a testing utility, makes it the perfect match to easily test your React application.
Snapshots to the rescue

Let’s start off easy with testing a simple pure stateless (a.k.a. dumb) component which renders a simple link element containing a title and an url.
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

We want to test this component by checking if the properties are coming in right and if it’s rendered correctly. With Jest we have a very easy way to do this by creating snapshots. The first time when running the test a snapshot is created. You can then look at the created file to check whether this rendered component matches your desired outcome. Let’s write the first test for our component. In this case we’re gonna use the [shallow](https://enzymejs.github.io/enzyme/docs/api/shallow.html) renderer of Enzyme to help us creating the snapshot.

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

After running the tests, Jest will automaticly create a `__snapshots__` directory and a snapshot file containing the outcome of the test. In this case it creates a `Link-spec.js.snap` file containing the following outcome of the rendering of our component.
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
Let’s upgrade our component by adding a click event. This also means we have to rewrite our component to the class notation as we are going to bind the click event function to the component. Which can easily be done by creating an arrow function inside our component.
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

When you run our previous test at this moment, it will fail as your saved snapshot doesn’t match the new snapshot because we added the onClick property. If the snapshot looks correctly, you can easily update it by pressing u. The snapshot will now look like:
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

We are going to create a second test case to check whether the onClick event is being handled correctly. Our click events triggers an alert and we can easily mock this functionality in Jest by using [jest.fn()](https://jestjs.io/docs/en/jest-object). After shallow rendering our component we’re simulating a click event and check if the alert is being called with the correct string. (In this case no snapshot file is created, as we don’t use the snapshot functionality)
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
We can also easily test the state of our component. Update the component by initiating the state in the constructor and expanding the click event with the setState function. When clicking on the element, we’re now also going to update the clicked state from false to true.
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

Let’s create a third test where we render the output and check the state. The first time we check the clicked state property should be false. After a click the property should be changed to true.
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
One of the best benefits of Jest is the easiness of creating all kind of mocks. We already used jest.fn() in one of our unit tests which is a very simple mock function that returns a spy, but you can also mock entire files.

> If you aren’t mocking, you aren’t unit testing!

The most easiest way to mock files is using the jest.mock function which automatically mocks the file by returning mocked functions. Let try to mock react-dom and check whether the render function has been called.
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

We create the test like we normally would do, but added the jest.mock line. Now the render function of react-dom is a mock function which returns a spy which we can now use in our test to check whether it has been called with the correct properties.

When you don’t want Jest to automatically create mock functions of your file, you can easily create a mock file yourself. Just create a `__mocks__` directory and add the to be mocked file in there. Now Jest will use this file when you call jest.mock in your unit test. For the react-dom example, create react-dom.js file which returns the render spy function.
```
export default {
  render: jest.fn(),
};
```

In our example we’re returning a spy function on which we can check whether it’s called correctly, but you’re spy could also return values or implementations.
```
render: jest.fn().mockReturnValue('component is rendered'),
render: jest.fn().mockImplementation(() => 'mock implementation'),
```

### Roundup
So these are the very basics of unit testing your application using Jest and Enzyme. Both have very good online documentation available, start from here and you can create your unit tests in a fast, efficient and easy way!

There’s no reason to not start testing today ;)

## References
1. [Jest](https://jestjs.io/)
2. [Enzyme](https://enzymejs.github.io/enzyme/index.html)

## Some good reads you may like
1. [React CI/CD](https://nayan.co/blog/Web/react-cicd/)
2. [Angular Youtube integration](https://nayan.co/blog/Web/angular-youtube/)
3. [Angular maps and clusters](https://nayan.co/blog/Web/angular-maps/)
