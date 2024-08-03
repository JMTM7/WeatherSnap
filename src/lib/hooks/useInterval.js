import { useEffect, useRef } from 'react';

/**
 * Custom hook that invokes a callback function repeatedly over an interval defined by the delay.
 * @param {Function} callback - The function to be invoked.
 * @param {number | null} delay - The interval time in milliseconds. If null, the callback will not be invoked.
 * @param {boolean} [leading=true] - If true, the callback will be invoked immediately (on the leading edge); otherwise, it will be invoked after the delay.
 */
export default function useInterval(callback, delay, leading = true) {
    const savedCallback = useRef(callback);

    // Update the latest callback function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        // Function to call the saved callback
        const tick = () => {
            savedCallback.current();
        };

        if (delay !== null) {
            if (leading) {
                tick(); // Invoke callback immediately if leading is true
            }
            const id = setInterval(tick, delay);
            return () => clearInterval(id); // Clean up the interval on unmount or delay change
        }
    }, [delay, leading]);
}
