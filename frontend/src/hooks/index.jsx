import { useState, useEffect, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

// =====================================
// API Hook with Error Handling & Caching
// =====================================

/**
 * Modern API hook with caching, retry logic, and proper error handling
 */
export function useApi(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { enabled = true, retry = 3, cacheKey, refetchOnWindowFocus = false } = options;
  const retryCountRef = useRef(0);
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    try {
      setLoading(true);
      setError(null);

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      // Check cache first (simple in-memory cache)
      if (cacheKey && window.sessionStorage) {
        const cached = sessionStorage.getItem(`api_cache_${cacheKey}`);
        if (cached) {
          const { data: cachedData, timestamp } = JSON.parse(cached);
          const isExpired = Date.now() - timestamp > 5 * 60 * 1000; // 5 minutes
          
          if (!isExpired) {
            setData(cachedData);
            setLoading(false);
            return;
          }
        }
      }

      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        signal: abortControllerRef.current.signal,
        headers: {
          'Content-Type': 'application/json',
          // TODO: Add auth headers when implementing authentication
          // 'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);

      // Cache the result
      if (cacheKey && window.sessionStorage) {
        sessionStorage.setItem(`api_cache_${cacheKey}`, JSON.stringify({
          data: result,
          timestamp: Date.now()
        }));
      }

      retryCountRef.current = 0; // Reset retry count on success
      
    } catch (err) {
      if (err.name === 'AbortError') {
        return; // Request was aborted, don't set error
      }
      
      // Retry logic
      if (retryCountRef.current < retry) {
        retryCountRef.current += 1;
        setTimeout(() => fetchData(), 1000 * retryCountRef.current); // Exponential backoff
        return;
      }
      
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, enabled, retry, cacheKey]);

  const refetch = useCallback(async () => {
    retryCountRef.current = 0;
    await fetchData();
  }, [fetchData]);

  // Effect for initial fetch
  useEffect(() => {
    fetchData();

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  // Refetch on window focus
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const handleFocus = () => {
      if (!document.hidden && data) {
        refetch();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchOnWindowFocus, data, refetch]);

  return { data, loading, error, refetch };
}

// =====================================
// Enhanced Intersection Observer Hook
// =====================================

/**
 * Advanced intersection observer hook with additional features
 * Perfect for scroll-triggered animations
 */
export function useIntersection(options = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = false, delay = 0 } = options;
  const [hasBeenInView, setHasBeenInView] = useState(false);

  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce,
    delay
  });

  // Track if element has ever been in view
  useEffect(() => {
    if (inView && !hasBeenInView) {
      setHasBeenInView(true);
    }
  }, [inView, hasBeenInView]);

  return { ref, inView, hasBeenInView };
}

// =====================================
// Local Storage Hook
// =====================================

/**
 * Local storage hook with serialization
 */
export function useLocalStorage(key, initialValue) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return { value: storedValue, setValue, removeValue };
}

// =====================================
// Scroll Position Hook
// =====================================

/**
 * Hook to track scroll position and direction
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  
  const previousScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = documentHeight > 0 ? (currentScrollY / documentHeight) * 100 : 0;

      setScrollY(currentScrollY);
      setScrollPercentage(Math.min(100, Math.max(0, percentage)));

      if (currentScrollY > previousScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < previousScrollY.current) {
        setScrollDirection('up');
      }

      previousScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, scrollDirection, scrollPercentage };
}

// =====================================
// Debounced Value Hook
// =====================================

/**
 * Hook to debounce a value - useful for search inputs
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// =====================================
// Media Query Hook
// =====================================

/**
 * Hook to handle responsive breakpoints
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

// =====================================
// Form Validation Hook
// =====================================

/**
 * Generic form validation hook
 */
export function useForm(initialValues, validationRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validateField = useCallback((name, value) => {
    const validator = validationRules[name];
    return validator ? validator(value) : null;
  }, [validationRules]);

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validate field on change
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [validateField]);

  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(values).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField]);

  const handleSubmit = useCallback((onSubmit) => {
    return (e) => {
      e.preventDefault();
      if (validateAll()) {
        onSubmit(values);
      }
    };
  }, [values, validateAll]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0 && Object.values(errors).every(error => !error);

  return {
    values,
    errors,
    isValid,
    handleChange,
    handleSubmit,
    reset
  };
}

// =====================================
// Copy to Clipboard Hook
// =====================================

/**
 * Hook for copying text to clipboard with feedback
 */
export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      return true;
    } catch (error) {
      console.warn('Failed to copy text:', error);
      return false;
    }
  }, []);

  return { copyToClipboard, copied };
}