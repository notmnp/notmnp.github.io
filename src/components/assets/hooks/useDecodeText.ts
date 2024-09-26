import { useEffect } from 'react';

export const useDecodeText = (
    elementId: string,
    finalText: string,
    delay: number
) => {
    useEffect(() => {
        const decodeText = (
            elementId: string,
            finalText: string,
            delay: number
        ) => {
            const element = document.getElementById(elementId);
            if (!element) return;

            element.innerHTML = ''; // Clear the element initially

            const possibleChars =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const textArray = finalText
                .split('')
                .map((char) => (char === ' ' ? '\u00A0' : char));
            const maxIterations = 25; // Max number of iterations per character

            // Create a span for each character in the final text
            textArray.forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = ''; // Empty span initially
                element.appendChild(span);

                let iterations = 0;
                let isFinalized = false;

                // Create interval for each character
                const intervalId = setInterval(() => {
                    if (iterations >= maxIterations || isFinalized) {
                        span.textContent = char;
                        clearInterval(intervalId); // Clear interval when finalized
                        return;
                    }

                    const randomChar = possibleChars.charAt(
                        Math.floor(Math.random() * possibleChars.length)
                    );

                    // Adjust the probability of hitting the correct letter as iterations increase
                    const probability = iterations / maxIterations; // Probability grows with iterations

                    // If randomization matches or probability condition passes, finalize the character
                    if (randomChar === char || Math.random() < probability) {
                        span.textContent = char;
                        isFinalized = true;
                    } else {
                        span.textContent = randomChar;
                    }

                    iterations++;
                }, delay);
            });
        };

        decodeText(elementId, finalText, delay);
    }, [elementId, finalText, delay]);
};
