<!-- omit in toc -->

# Example React Redux unnecessary re-rendering demo

Over the years redux became one of the most popular options for managing global state in react. There have been many opinions on how to structure applications that use `react-redux`. This example project will show how the classic redux structure leads to performance issues and how to migrate to the correct structure recommended by the redux team.

<!-- omit in toc -->

## Table of Contents

- [Example React Redux unnecessary re-rendering demo](#example-react-redux-unnecessary-re-rendering-demo)
  - [Table of Contents](#table-of-contents)
  - [Classic structure](#classic-structure)
  - [Best Practices](#best-practices)
    - [Getting State](#getting-state)
    - [Naming](#naming)
    - [What kind of state to get](#what-kind-of-state-to-get)
  - [Understand how immutable objects impact performance](#understand-how-immutable-objects-impact-performance)
  - [Step 1: Original Implementation](#step-1-original-implementation)
    - [On load performance](#on-load-performance)
    - [`Selected` button performance](#selected-button-performance)
  - [Step 2: Refactor File organization](#step-2-refactor-file-organization)
  - [Step 3: Connecting `<Options>` to state](#step-3-connecting-options-to-state)
  - [Step 4: Connecting `<Car>` to state](#step-4-connecting-car-to-state)
  - [Step 5: Remove `connect` HOC](#step-5-remove-connect-hoc)
    - [Load and click performance](#load-and-click-performance)
  - [Step 6: Selectors](#step-6-selectors)
  - [Step 6.1: Refactor store files](#step-61-refactor-store-files)
  - [Summary](#summary)

## Classic structure

The Classic redux structure is no longer officially documented and dead. I left the blurb below explaining what used to happen, but its impossible to visit anymore.

~~[The classic redux documentation recommends](https://redux.js.org/basics/usage-with-react) structuring projects with the following pattern: a `containers` folder which holds all your components connected to global state, and a `components` folder which holds all your presentational components. Visiting this link today, the redux team marks this pattern as deprecated:~~

<img src="https://user-images.githubusercontent.com/383719/96644430-abdf8100-12ee-11eb-9f3c-e2cd3c8441cc.png" alt="react deprecation" width="650"/>

This example project will show step by step the performance and complexity downside to the classic redux structure, and how to migrate a project to use the recommended pattern according to the [Redux Essentials Tutorial](https://redux.js.org/tutorials/essentials/part-2-app-structure), which the redux team considers the most up to date documentation. They also have [a best practices style guide](https://redux.js.org/style-guide/style-guide). Combined, here are some of primary suggestions:

## Best Practices

<!-- omit in toc -->

### Getting State

_Don’t_: Create a container component whose only job it is to pass state to another component without doing any rendering or logic. This leads to unnecessary coupling and complexity, especially at scale.

_Do_: [Connect every single component that needs a piece of state to render or accomplish an action](https://redux.js.org/style-guide/style-guide#connect-more-components-to-read-data-from-the-store). There is no measurable performance penalty doing this, contrary to popular belief. Quite often performance increases when components only get the small amount of state they need.

<!-- omit in toc -->

### Naming

_Don’t_: [Add the word `container` to a component connected to state](https://redux.js.org/style-guide/style-guide#structure-files-as-feature-folders-or-ducks). Example: `CarContainer`.

_Do_: Name things for what they are or do, not if they are connected to state. Example `Car`.

<!-- omit in toc -->

### What kind of state to get

_Don’t_: Fetch objects and pass the object or their fields around to other components through component properties.

_Do_: [Fetch primitive values that will be used for rendering or logic, like strings, bools, numbers, etc](https://redux.js.org/style-guide/style-guide#call-useselector-multiple-times-in-function-components). If rendering lists of things, fetch the hashmap or array to render the list, and pass the child objects ID to the next component so it knows what data to fetch.

## Understand how immutable objects impact performance

[Redux requires your state to be immutable](https://redux.js.org/faq/immutable-data#why-is-immutability-required-by-redux), so [understanding how immutable works](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#immutability) is paramount to fixing performance. Updating immutable data properly directly informs React which components need to re-render. By connecting a single component to too many pieces of data, or connecting it too high up in the tree of data, any time a leaf data element changes, the component connected to that data either directly, or to its ancestor data element will cause all of that’s components children to re-render, even though nothing actually changed.

## Step 1: Original Implementation

[View branch source](https://github.com/JasonMore/rerendering-react-redux/tree/step1-naive-implementation/src)

Here is a classic setup for any react redux app which started development 2-3 years ago. You have three directories, components, containers, and store:

```text
src
├── App.js
├── components
│   ├── Car.js
│   └── Options.js
├── containers
│   └── CarsPageContainer.js
├── index.js
└── store
    ├── actions
    │   ├── car.js
    │   └── options.js
    ├── middleware
    ├── reducers
    │   ├── carReducer.js
    │   └── optionReducer.js
    └── store.js
```

![example application](https://user-images.githubusercontent.com/383719/96742527-a46cb600-1388-11eb-9fd6-c213334815f6.png)

The `<CarsPageContainer>` is the only component getting data out of state, and passing it to child components

```jsx harmony
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { carData } from "../_fixtures/mockCarData";
import Car from "../components/Car";
import { canToggleSelected } from "../store/actions/options";
import Options from "../components/Options";
import { addAllCars, addCar, selectCar } from "../store/actions/car";

const CarsPageContainer = ({
  carState,
  optionState,
  addAllCars,
  canToggleSelected,
  selectCar,
  addCar,
}) => {
  useEffect(() => {
    // simulate ajax load
    setTimeout(() => {
      addAllCars(carData);
    }, 500);
  }, [addAllCars]);

  return (
    <div>
      <Options
        addCar={addCar}
        canToggle={optionState.canToggle}
        canToggleSelected={canToggleSelected}
      />

      <div className="m-2 p-2">
        <h2>Cars</h2>

        <div className="container-fluid row">
          {carState.cars.map((car) => (
            <Car
              key={car.id}
              car={car}
              selectCar={selectCar}
              canToggle={optionState.canToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  carState: state.car,
  optionState: state.option,
});

const mapDispatchToProps = {
  addAllCars,
  canToggleSelected,
  selectCar,
  addCar,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarsPageContainer);
```

`<Car>`

```jsx harmony
import React from "react";

const Car = ({ car, canToggle, selectCar }) => {
  const onCarClicked = () => {
    if (!canToggle) return;
    selectCar(car.id, !car.selected);
  };

  return (
    <div className="card m-1" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={car.image}
        height={160}
        alt={car.name}
      />
      <div className="card-body">
        <h5 className="card-title">{car.name}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <button
          className={`btn w-100 ${
            car.selected ? "btn-primary" : "btn-secondary"
          }`}
          onClick={onCarClicked}
        >
          {car.selected ? "☑︎" : "☐"} Selected
        </button>
      </div>
    </div>
  );
};

export default Car;
```

`<Options>`

```jsx harmony
import React from "react";

const Options = ({ canToggle, canToggleSelected, addCar }) => {
  return (
    <div className="m-2 p-2">
      <h2>Options</h2>
      <p>
        <button
          className={`btn ${canToggle ? "btn-primary" : "btn-secondary"}`}
          onClick={() => canToggleSelected(!canToggle)}
        >
          {canToggle ? "☑ Selection Enabled" : "☐ Selection Disabled"}
        </button>
        <button
          className="btn btn-light ml-2"
          onClick={() => addCar("astonMartin")}
        >
          Add Aston Martin
        </button>
        <button className="btn btn-light ml-2" onClick={() => addCar("audi")}>
          Add Audi
        </button>
      </p>
    </div>
  );
};

export default Options;
```

The `carReducer` has a single `cars` array with 36 `car` objects, and the `optionReducer` has a single `canToggle` boolean.

<img src="https://user-images.githubusercontent.com/383719/96742898-02999900-1389-11eb-8201-b19740d8a275.png" alt="state" width="400"/>

<!-- omit in toc -->

### On load performance

In this example, mock data simulating an API is dispatched to state 500ms after the `<CarsPageContainer>` is mounted. In this screenshot `CAR_ADD_ALL` was dispatched, and subsequently the `Options` component was rendered again needlessly.

<img src="https://user-images.githubusercontent.com/383719/96743337-82bffe80-1389-11eb-8437-8245135d99da.png" alt="options renders extra" width="700"/>

It took ~52ms for this action to update redux and render components, and 11ms for chrome to update the screen.

<img src="https://user-images.githubusercontent.com/383719/96743416-99665580-1389-11eb-9cf3-e045b0ebdad7.png" alt="52ms render performance" width="300"/>

Of the 39ms of javascript, ~24ms was components rendering

<img src="https://user-images.githubusercontent.com/383719/96743476-aa16cb80-1389-11eb-9bf6-37d0a2745130.png" alt="components rendering" width="700"/>

<!-- omit in toc -->

### `Selected` button performance

The other performance issue with this structure is every time you click any of the buttons on a car component, the entire app re-renders! The blue boxes around components show they are being re-rendered.

![2020-10-16 17 36 20](https://user-images.githubusercontent.com/383719/96743678-ddf1f100-1389-11eb-8868-937d2b5d3bad.gif)

This is due to the `cars.map(car => …) ` line in the `CarsPageContainer`. Below is a screenshot showing all the components that rendered again but didn’t actually need to. You’ll see the `Options` component rendering again, along with every other car component.

<img src="https://user-images.githubusercontent.com/383719/96743841-05e15480-138a-11eb-86d3-51fad1d8b9b9.png" alt="cars re-rendering" width="700"/>

It takes ~56ms to update this change, but only 2ms of that is chrome updating the screen.

<img src="https://user-images.githubusercontent.com/383719/96744546-c9fabf00-138a-11eb-85c0-42e47239d939.png" alt="cars selection" width="300"/>

<img src="https://user-images.githubusercontent.com/383719/96744588-d41cbd80-138a-11eb-8bfb-e472936085e1.png" alt="cars selection rendering" width="700"/>

## Step 2: Refactor File organization

[View branch source](https://github.com/JasonMore/rerendering-react-redux/tree/step2-refactor-folders/src)

In this example, all the files will be restructured to match [the Redux best practices](https://redux.js.org/tutorials/essentials/part-2-app-structure) suggested app structure before doing any refactoring.

```text
src
├── App.js
├── features
│   ├── car
│   │   └── Car.js
│   ├── option
│   │   └── Options.js
│   └── pages
│       └── CarsPage.js
├── index.js
└── store
    ├── actions
    │   ├── car.js
    │   └── options.js
    ├── middleware
    ├── reducers
    │   ├── carReducer.js
    │   └── optionReducer.js
    └── store.js
```

Diff: [https://github.com/JasonMore/rerendering-react-redux/compare/step1-naive-implementation...step2-refactor-folders](https://github.com/JasonMore/rerendering-react-redux/compare/step1-naive-implementation...step2-refactor-folders)

## Step 3: Connecting `<Options>` to state

[View branch source](https://github.com/JasonMore/rerendering-react-redux/tree/step3-fix-loading-rerendering/src)

Once the concept of a `Container` component is removed, and any component can get data, it no longer makes sense for `<CarsPage>` to send data to options it can get itself. `<Options>` can exist solely on its own. This reduces the complexity of `<CarsPage>` having to know anything about `state.option`.

![image](https://user-images.githubusercontent.com/383719/96745334-a71cda80-138b-11eb-9add-59223fded8af.png)

![image](https://user-images.githubusercontent.com/383719/96759532-cd4b7600-139d-11eb-8d0b-d7332b83edc8.png)

diff: [https://github.com/JasonMore/rerendering-react-redux/compare/step2-refactor-folders...step3-fix-loading-rerendering](https://github.com/JasonMore/rerendering-react-redux/compare/step2-refactor-folders...step3-fix-loading-rerendering)

After this change, `<Options>` no longer re-renders after the mock api response is set to state.

<img src="https://user-images.githubusercontent.com/383719/96759689-0257c880-139e-11eb-8636-aeedc08bf9a0.png" alt="" width="700"/>

The React Profile tool also shows `<Options>` did not render.

<img src="https://user-images.githubusercontent.com/383719/96759850-2fa47680-139e-11eb-9399-3a6794572902.png" alt="" width="700"/>

The **Step 1** rendering time was ~52ms, and after adding another component to state, the new rendering time is also ~52ms. Decoupling components and connecting to state provides **less complex code that doesn’t impact performance.**

<img src="https://user-images.githubusercontent.com/383719/96759980-5f537e80-139e-11eb-924a-1a816bcf2252.png" alt="" width="300"/>

## Step 4: Connecting `<Car>` to state

[View branch source](https://github.com/JasonMore/rerendering-react-redux/tree/step4-fix-selecting-car/src)

Clicking on any car in the list of cars causes the entire app to re-render. Fixing this requires changing the list of cars from an array to a hashmap. A hashmap is a list of objects you can reference by key. Functionally it can work the same as an array, but instead have direct access to any member of the list immediately through it’s id property. This allows direct access to any item in the list.

Diff: [https://github.com/JasonMore/rerendering-react-redux/compare/step3-fix-loading-rerendering...step4-fix-selecting-car](https://github.com/JasonMore/rerendering-react-redux/compare/step3-fix-loading-rerendering...step4-fix-selecting-car)

![image](https://user-images.githubusercontent.com/383719/96760255-7db97a00-139e-11eb-86bd-774f6efb0d73.png)

State also needs to be pushed down to each `<Car>` by connecting it to the redux store directly. Each car can reference its own car data through the `carId` property passed to it. None of the properties used to render the car changed in this diff, just where the data came from.

![image](https://user-images.githubusercontent.com/383719/96760671-96299480-139e-11eb-9675-1c6435041a9a.png)

Now that each `<Car />` is connected to state, all of the props can be exchanged for a single id prop `<Car id={car.id} />

![image](https://user-images.githubusercontent.com/383719/96761050-ac375500-139e-11eb-9c6f-1f11342d34e3.png)

After this change, only the single car re-renders on selection.

![2020-10-16 18 37 43](https://user-images.githubusercontent.com/383719/96761380-bfe2bb80-139e-11eb-9a7f-ad03e296d149.gif)

The fix can be verified by a lack of `why-did-you-render` warnings after the redux action was dispatched.

<img src="https://user-images.githubusercontent.com/383719/96767655-6ed4c680-13a2-11eb-9e1f-2e3fab39e083.png" alt="" width="700"/>

By breaking up the hard connection of passing props to each car, this turns the single pass rendering into two different rendering cycles. The first render is the `<CarsPage>` making sure no new cars were added or removed. Since the only prop we pass to each car is only it’s `id` now, each car does not render again since that one property did not change. Internally the `react-redux` method `connect` checks to see if any property actually changed before allowing the component to render, exactly how `PureComponent` or `React.memo` works.

<img src="https://user-images.githubusercontent.com/383719/96767782-975cc080-13a2-11eb-8833-873199e21320.png" alt="" width="700"/>

Since each component has access to state, its `mapStateToProps` function is called again, and if any of those change, then that component is queued up to render again. Only the single car renders again.

<img src="https://user-images.githubusercontent.com/383719/96767854-b6f3e900-13a2-11eb-855c-f884b6653ff6.png" alt="" width="700"/>

**It originally took ~56ms to handle the button click, and these updates reduced it to ~33ms, a 40% performance improvement.** This shows that connecting more components to state does not negatively impact performance, and can make it better.
<img src="https://user-images.githubusercontent.com/383719/96767943-d2f78a80-13a2-11eb-9c0e-fdfe01b7a25b.png" alt="" width="300"/>

## Step 5: Remove `connect` HOC

[View branch source](https://github.com/JasonMore/rerendering-react-redux/tree/step5-remove-connect/src)

React and redux have come a long way in the last few years. One of the best improvements in React is the adding of hooks, [which lowers the amount of cognitive load when writing react components with redux](https://redux.js.org/style-guide/style-guide#use-the-react-redux-hooks-api). This adds clarity to any component, as the only props to reason about are the ones actually passed into the component, not a mix of what is coming from a parent component and redux.

In the case of `<Car>`, the complexity is actually two fold, as the `carId` prop is never even used in the render method. **By using react-redux hooks, the code becomes cleaner and more concise.**

The most important thing to remember when converting a component from `connect` to redux hooks, is that `connect` provides built in memoization of props passed to the component, just like how `PureComponent` and `React.memo` work. So if a component has legitimate need for outside props to render something, such as an `id`, you should consider using `React.memo`. In this example, converting the component without `React.memo` causes all the `<Car>` components to start re-rendering needlessly again.

Diff: [https://github.com/JasonMore/rerendering-react-redux/compare/step4-fix-selecting-car...step5-remove-connect](https://github.com/JasonMore/rerendering-react-redux/compare/step4-fix-selecting-car...step5-remove-connect)

![image](https://user-images.githubusercontent.com/383719/96768405-7ba5ea00-13a3-11eb-8ce5-8d5ccdf91f8c.png)

![image](https://user-images.githubusercontent.com/383719/96768727-c9baed80-13a3-11eb-9e0b-86c8e22fd1d7.png)

<!-- omit in toc -->

### Load and click performance

Switching from the `connect` HOC to functional components doesn’t change performance at all.

load:

<img src="https://user-images.githubusercontent.com/383719/96768784-dccdbd80-13a3-11eb-8990-ea0d49d0f54e.png" alt="" width="300"/>

clicking "Selected" on a car:

<img src="https://user-images.githubusercontent.com/383719/96768849-f111ba80-13a3-11eb-9d9d-eb4ca5cd82eb.png" alt="" width="300"/>

## Step 6: Selectors

[View branch source](https://github.com/JasonMore/rerendering-react-redux/tree/step6-selectors/src)

Using selector functions for getting values out of state greatly improves the mental work of getting values out of state, allows easier refactoring of components, and is [a recommended best practice by the redux team](https://redux.js.org/style-guide/style-guide#use-selector-functions-to-read-from-store-state).

![image](https://user-images.githubusercontent.com/383719/96774900-5a95c700-13ac-11eb-9410-744b7435d0e9.png)

## Step 6.1: Refactor store files

Keeping the `store` folders aligned to features, just like the components folders aligned to features colocates relevant files together.

```text
src
├── App.js
├── features
│   ├── car
│   │   └── Car.js
│   ├── option
│   │   └── Options.js
│   └── pages
│       └── CarsPage.js
├── index.js
└── store
    ├── car
    │   ├── carActions.js
    │   ├── carReducer.js
    │   └── carSelectors.js
    ├── middleware
    ├── option
    │   ├── optionReducer.js
    │   ├── optionSelectors.js
    │   └── optionsActions.js
    └── store.js
```

## Summary

Connecting child components to state has no measurable performance loss, and after code refactoring significant opportunity for performance gains. Connecting components with the data they actually need for rendering reduces the complexity of a component, and removes hard co-dependencies between components where they shouldn’t exist.
