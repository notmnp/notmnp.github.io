// hooks/useDecodeText.ts
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

            element.innerHTML = '';
            const possibleChars =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const textArray = finalText
                .split('')
                .map((char) => (char === ' ' ? '\u00A0' : char));

            textArray.forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = '';
                element.appendChild(span);

                let iterations = 0;
                const maxIterations = Math.random() * 10 + 5;

                const randomizeLetter = setInterval(() => {
                    if (iterations >= maxIterations) {
                        clearInterval(randomizeLetter);
                        span.textContent = char;
                        return;
                    }
                    span.textContent = possibleChars.charAt(
                        Math.floor(Math.random() * possibleChars.length)
                    );
                    iterations++;
                }, delay * 1000);
            });
        };

        decodeText(elementId, finalText, delay);
    }, [elementId, finalText, delay]);
};
