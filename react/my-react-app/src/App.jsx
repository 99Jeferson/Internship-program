function Welcome() {
  return <h2>Welcome to React Development </h2>;
}

function App() {
  return (
    <div>
      <h1>My First React App</h1>

      <p>
        Learning React is fun and rewarding. It allows you to build interactive user interfaces with ease. With React, you can create reusable components that make your code more efficient and maintainable.
      </p>

      <Welcome />
    </div>
  );
}

export default App;