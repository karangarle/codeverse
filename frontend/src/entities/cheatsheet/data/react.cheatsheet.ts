import type { CheatsheetData } from "../model/types";

export const reactCheatsheet: CheatsheetData = {
  category: "React",
  title: "React Cheat Sheet",
  subtitle:
    "A React quick reference covering components, hooks, patterns, and best practices.",
  sections: [
    {
      id: "components",
      title: "Components",
      cards: [
        {
          id: "functional-component",
          title: "Functional Component",
          lang: "jsx",
          code: `import React from 'react';

function Greeting({ name, age = 0 }) {
  return (
    <div className="card">
      <h2>Hello, {name}!</h2>
      <p>Age: {age}</p>
    </div>
  );
}

export default Greeting;`,
        },
        {
          id: "props",
          title: "Props",
          lang: "jsx",
          code: `// Passing props
<Button
  label="Click me"
  onClick={handleClick}
  disabled={false}
  style={{ color: 'red' }}
/>

// Receiving props
function Button({ label, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}`,
        },
        {
          id: "jsx-basics",
          title: "JSX Basics",
          lang: "jsx",
          code: `const element = (
  <div className="container">
    {/* Conditional rendering */}
    {isLoggedIn && <UserPanel />}
    {isLoggedIn ? <Logout /> : <Login />}

    {/* Lists */}
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </div>
);`,
        },
      ],
    },
    {
      id: "hooks",
      title: "React Hooks",
      cards: [
        {
          id: "usestate",
          title: "useState",
          lang: "jsx",
          code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        +1
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}`,
        },
        {
          id: "useeffect",
          title: "useEffect",
          lang: "jsx",
          code: `import { useEffect, useState } from 'react';

function DataFetcher({ userId }) {
  const [data, setData] = useState(null);

  // Run on mount and when userId changes
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(r => r.json())
      .then(setData);

    // Cleanup on unmount
    return () => console.log('cleanup');
  }, [userId]); // dependency array

  return <div>{data?.name}</div>;
}`,
        },
        {
          id: "usememo-usecallback",
          title: "useMemo & useCallback",
          lang: "jsx",
          code: `import { useMemo, useCallback } from 'react';

// Memoize expensive computation
const sortedList = useMemo(
  () => items.sort((a, b) => a.id - b.id),
  [items] // recompute when items changes
);

// Memoize a callback function
const handleClick = useCallback(
  (id) => deleteItem(id),
  [deleteItem] // stable reference
);`,
        },
        {
          id: "useref",
          title: "useRef",
          lang: "jsx",
          code: `import { useRef } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}`,
        },
        {
          id: "custom-hook",
          title: "Custom Hook",
          lang: "jsx",
          code: `function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Usage
const { data, loading } = useFetch('/api/posts');`,
        },
      ],
    },
    {
      id: "patterns",
      title: "Common Patterns",
      cards: [
        {
          id: "context",
          title: "Context API",
          lang: "jsx",
          code: `const ThemeContext = createContext('light');

// Provider
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// Consumer
function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Toolbar</div>;
}`,
        },
        {
          id: "error-boundary",
          title: "Error Boundary",
          lang: "jsx",
          code: `import React from 'react';
          
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Logged Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage:
// <ErrorBoundary><MyWidget /></ErrorBoundary>`,
        },
        {
          id: "lazy-loading",
          title: "Lazy Loading & Suspense",
          lang: "jsx",
          code: `import { lazy, Suspense } from 'react';
          
// Lazy load component
const LazyWidget = lazy(() => import('./Widget'));

function App() {
  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <LazyWidget />
    </Suspense>
  );
}`,
        },
        {
          id: "performance-optimization",
          title: "Performance (React.memo)",
          lang: "jsx",
          code: `import React, { useState, useCallback } from 'react';

// Memoized child component
const ListRow = React.memo(({ item, onClick }) => {
  console.log('Row rendered:', item.id);
  return <div onClick={() => onClick(item.id)}>{item.name}</div>;
});

function ParentList({ items }) {
  const [active, setActive] = useState(null);

  // useCallback prevents re-creating the function on parent state update
  const handleSelect = useCallback((id) => {
    setActive(id);
  }, []);

  return (
    <div>
      {items.map(item => (
        <ListRow key={item.id} item={item} onClick={handleSelect} />
      ))}
    </div>
  );
}`,
        },
      ],
    },
  ],
};
