// hooks/useIntersectionObserver.ts
import { useEffect } from 'react';

export const useIntersectionObserver = () => {
    useEffect(() => {
        const handleIntersection = (
            entries: IntersectionObserverEntry[],
            observer: IntersectionObserver
        ) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.04,
        });

        const elementsToObserve = document.querySelectorAll(
            '.grid-item, .experience-sidebar-wrapper, .experience-content, .projects-card, .contact-title, .contact-container, .experience-title, .projects-title'
        );
        elementsToObserve.forEach((item) => observer.observe(item));

        return () => observer.disconnect();
    }, []);
};
