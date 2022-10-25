import { FiMoon, FiSun } from 'react-icons/fi';
import { useHasMounted } from '../utils/hooks';
import { useTheme } from 'next-themes';

const enum Theme {
  Dark = 'dark',
  Light = 'light'
}

const ThemeSwitch = () => {
  const mounted = useHasMounted();
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return null;
  }

  const themeIcon = theme === Theme.Dark ? <FiSun /> : <FiMoon />;

  function toggleTheme() {
    setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex items-center rounded-full bg-gray-300 p-3 dark:bg-gray-800"
      onClick={() => toggleTheme()}
    >
      {themeIcon}
    </button>
  );
};

export default ThemeSwitch;
