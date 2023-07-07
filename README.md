# Trello with Vanilla Javascript

<img src="https://github.com/olhkyle/trello/assets/99726297/08b3f53f-a8da-436c-a046-8a1b3fbc01af"/>

## 🚀 Overview

- Implemented SPA (Single Page Application) using Vanilla JavaScript without any libraries or frameworks
- Created a Diffing algorithm similar to React's Reconciliation
- Designed a CBD library based on the implemented Diffing algorithm, using Class (ES6+) syntax
- Implemented various DOM event interactions using event delegation

<br/>

## 🎛️ Tech Stacks

`HTML` `CSS(Sass)` `JavaScript` `lodash`

<br/>

## 🖥️ Main Features with demo

### Feature 1

<img width="920" src="https://github.com/olhkyle/trello/assets/99726297/31a7e51e-d3c1-44f3-9f66-48fe2b24d04c">

- add Another List
- add new Card with using Card Creator
- remove list

<br/>

### Feature 2

<img width="920" src="https://github.com/olhkyle/trello/assets/99726297/938a53b5-6e86-43c7-a9a9-27a61b6222bd">

- change title of list with pressing 'Enter' key to save new title
- add new Card with using Card Creator

<br/>

### Feature 3

<img width="920" src="https://github.com/olhkyle/trello/assets/99726297/e6ab2ae6-0903-4286-9b43-890c20fc99db"/>

- Drag and drop with `Card` and `List` Component

- Close `ListCreator` and `CardCreator` component to press 'ESC'

  - If `textarea` component in `ListCreator` is focused, pressing 'ESC' makes `ListCreator` close
  - If all `textarea` components in `List` Components are opened, pressing 'ESC' makes all `CardCreator` close

- Open `Modal` Component, after click `Card` component
  - After Click `textarea` component and insert some words, press 'Enter' to save `Card` Component's title
  - If click `textarea` in description part, then we have to save the contents.
    - The situation Trello will not save contents
      1. click the `overlay` area
      2. click the area without `textarea` in description part
      3. click close `button` component
      4. after click `textarea` in description part, if we do not click 'save' button or press 'Enter' as `textarea` is
         focused

<br/>
<br/>

## ☕️ Efforts I encountered during SPA-Like Implementation without using Library

<details>
  <summary>
  <h3> ☕️ Rendering based on Diff Algorithm and Reconciliation mentioned in React</h3>
  </summary>

  <div markdown="1">

- SPA(Single Page Application)와 유사하게 동작하도록 `html`의 `body`에는 id가 `root`인 요소(컨테이너 요소) 하나만 존재하
  며, `#root` 의 자식 요소들은 어플리케이션을 실행하면 정의한 컴포넌트들이 반환하는 문자열(DOMString)이 파싱 과정에 의해
  DOM 요소로 변환되어 동적으로 화면을 그리도록 구현하였습니다.

- React의 **reconciliation**와 유사하게 작동하도록 Diffing 알고리즘 구현

  ```js
  // renderDOM.js
  let $root = null;
  let component = null;

  const renderDOM = (Component, $container) => {
  	if ($container) $root = $container;
  	if (Component) {
  		component = new Component({ $root: $container });
  		$root.innerHTML = component.render();
  	}

  	const createNewTree = () => {
  		const cloned = $root.cloneNode(true);
  		const domString = component.render();

  		cloned.innerHTML = domString;
  		return cloned;
  	};

  	// reconciliation
  	diff($root, createNewTree());

  	// bind Events
  	bindEventHandler($root);
  };
  ```

  - **Initial Rendering**

    - `renderDOM`이라는 함수는 id가 `root`인 요소에 자식 컴포넌트를 재귀적으로 호출하면서 자식 컴포넌트가 반환하는
      DOMString을 모아,이를 바탕으로 UI를 그립니다.

  - **Rerendering**
    - 컴포넌트가 갖고 있는 상태가 변하면, UI를 다시 그려야 합니다. 이 때, `setState`라는 상태 업데이트 함수를 호출하면서
      , renderDOM이라는 함수는 리렌더링을 위해 다시 호출됩니다. 이 때, 인수로 `Component`와 `$container`를 전달하지 않습
      니다.
    - 그 이유는, Initial Rendering 시에 `renderDOM` 함수 스코프 바깥에 선언한 `$root`(id가 root인 요소)에는 `App` Class
      Component가 재귀적으로 호출한 자식 컴포넌트들이 반환하는 DOMString이 `innerHTML` 메서드를 통해 할당되어 있어, 클로
      저에 의해 어떤 UI를 그릴 지에 대한 정보를 이미 담고 있습니다. 이 `$root`는 뒤에서 이야기할 메모리에 DOMString이 저
      장된 **oldNode**가 됩니다.
    - 리렌더링이 발생하면 업데이트 된 상태를 기반으로 UI를 다시 그려야 합니다. 먼저, `createNewTree`라는 함수를 호출하여
      , 복제한 `$root` 변수에 업데이트 된 상태를 가진 `component` 변수가 저장하고 있는 DOMString(`App` Class Component가
      재귀적으로 자식 컴포넌트를 호출하면서 끌어모은 DOMstring 값)을 `innerHTML` 메서드를 통해 할당하고, 복제한
      `$root`를 반환합니다.
    - 그리고, `diff` 함수(diffing 알고리즘이 구현된 함수)를 호출하여, 기존에 메모리에 올려져 있던 `oldNode`(type ===
      object)와 `createNewTree` 함수가 반환한 복제된 `$root`인 `newNode`(type === object)를 비교하여
      **reconciliation**을 실행합니다.
    - 즉, 메모리에 저장되어 있던 DOM 트리 형태를 띄는 `oldNode`와 상태 변경에 의해 새롭게 생성된 `newNode`를 비교하면서,
      다른 부분(e.g 요소 노드, 어트리뷰트 노드 등)만 업데이트 하는 방식을 취합니다.
    - 결과적으로, 메모리에 올려져 있는 객체(DOMString)의 참조값을 비교하면서 업데이트 한다고 설명할 수 있습니다.

> ☕️ DOMstring은 utf-16 문자열을 위한 독립적으로 구현된 DOM 인터페이스로, javascript 문자열은 이미 utf-16 문자열형태이
> 다. 따라서, javascript의 모든 인스턴스 String은 DOMString 인스턴스라고 이야기 할 수 있다.

  </div>
</details>

<details>
  <summary>
  <h3>☕️☕️ Event Delegation, 'this' binding and event Handling</h3>
  </summary>

  <div markdown="2">
  - Class로 컴포넌트를 구현하면서 이벤트 위임, 그리고 this 바인딩, 이벤트 핸들링 방식에 대해 고민하였습니다.

    
   - 이벤트 위임을 통해 모든 이벤트를 핸들링 하도록 구현하였다. 즉, `$root`라는 루트 컨테이너 요소에 이벤트를 위임함으로써, 자식 컴포넌트에서 발생하는 이벤트를 핸들링하고 있습니다.
   - 이벤트 위임에 의해 `$root` 컴포넌트에서 발생하는 이벤트, `window` 전역 객체에서 발생하는 이벤트를 분리하여 event Type에 맞는 이벤트를 핸들링합니다.
   - event Type에 따라 실행될 `handler`에는 this에 대한 이해가 필요한 상황이 발생합니다. 그 이유는 부모 컴포넌트가 자식 컴포넌트를 재귀적으로 호출하는 방식으로 구현하였기 때문입니다. this는 메서드를 호출한 객체에 바인딩 되므로, `bind` 메서드를 통해 자식 컴포넌트에 바인딩하여 이벤트가 발생했을 때 이벤트 핸들러(콜백함수)를 호출할 수 있게 됩니다.
  </div>
</details>

<br/>
<br/>

## 🔭 What I learned

- 바닐라 자바스크립트로 웹 어플리케이션을 만들어 본 값진 경험
  - 라이브러리 없이 바닐라 자바스크립트만을 이용하여 SPA처럼 구현할 때 이벤트를 핸들링하고 컴포넌트를 렌더링하는 과정은
    상당히 어려웠지만, 구현이 완료되었을 때 상당히 만족스러웠습니다.
  - this 바인딩, 클래스 Syntax에 대한 이해도가 이전보다 높아졌다고 생각합니다.
  - 잘 쓰지 않았던 DOM API에 대해 알게 되어 좋았음며, 이벤트 위임을 활용한 이벤트 핸들링 경험은 값졌습니다.
