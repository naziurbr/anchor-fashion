import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const NavigationContext = createContext(() => {});

export function NavigationProvider({ children }) {
  const [location, setLocation] = useState(() => `${window.location.pathname}${window.location.search}`);

  useEffect(() => {
    const update = () => setLocation(`${window.location.pathname}${window.location.search}`);
    const navigate = (event) => {
      const next = event.detail;
      window.history.pushState({}, '', next);
      update();
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', update);
    window.addEventListener('anchor:navigate', navigate);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('anchor:navigate', navigate);
    };
  }, []);

  const go = (to) => window.dispatchEvent(new CustomEvent('anchor:navigate', { detail: to }));
  const value = useMemo(() => ({ location, go }), [location]);

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  return useContext(NavigationContext);
}

export function Link({ to, children, className = '', onClick, ...props }) {
  const { go } = useNavigation();
  return (
    <a
      href={to}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
          event.preventDefault();
          go(to);
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}
