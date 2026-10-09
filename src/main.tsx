import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  return (
    <main>
      <header>Bengalis of Philadelphia</header>
      <h1>Culture.<br />Community.<br />Philly.</h1>
      <p>Our website is on its way. In the meantime, join us on Heylo and follow along on Instagram.</p>
      <nav aria-label="Community links">
        <a href="https://heylo.group/bengalis-of-philadelphia">Join on Heylo</a>
        <a href="https://www.instagram.com/bengalisofphiladelphia/">Find us on Instagram</a>
      </nav>
      <footer>Website preview</footer>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
