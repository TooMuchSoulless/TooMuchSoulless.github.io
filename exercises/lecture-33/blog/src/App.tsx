import './App.css'

//Завдання 3
const jsxElement = <h1>I am a JSX element!</h1>;

//Завдання 4
const header = (
  <header>
    <h1>Welcome to React</h1>
    <h2>Getting Started React</h2>
    <h3>JavaScript Library</h3>
  </header>
);

//Завдання 5
const jsxFragment = (
  <>
    <h1>Welcome to React</h1>
    <h2>Getting Started React</h2>
    <h3>JavaScript Library</h3>
  </>
);

//Завдання 6
const footer = (
  <footer>
    <p>Copyright &copy; 2024</p>
  </footer>
);

function App() {

  return (
    <>
      <div>
        {/*Завдання 4*/}
        {header}

        {/*Завдання 3*/}
        {jsxElement}

        {/*Завдання 5*/}
        {jsxFragment}

        {/*Завдання 6*/}
        {footer}
      </div>
    </>
  )
  
}

export default App
