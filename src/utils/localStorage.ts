
// Type-safe localStorage utility

const STORAGE_PREFIX = 'tablewave_';

/**
 * Get item from localStorage with proper typing
 */
export function getStorageItem<T>(key: string, fallback: T): T {
  try {
    const item = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch (error) {
    console.error(`Error getting localStorage key "${key}":`, error);
    return fallback;
  }
}

/**
 * Set item in localStorage with type safety
 */
export function setStorageItem<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
}

/**
 * Remove item from localStorage
 */
export function removeStorageItem(key: string): void {
  try {
    window.localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
}

/**
 * Clear all app-related items from localStorage
 */
export function clearStorage(): void {
  try {
    Object.keys(window.localStorage)
      .filter(key => key.startsWith(STORAGE_PREFIX))
      .forEach(key => window.localStorage.removeItem(key));
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}
