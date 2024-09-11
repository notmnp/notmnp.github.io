import React, { useEffect, useRef, useState } from 'react';
import './Pointer.css';

const Pointer: React.FC = () => {
    const blobRef = useRef<HTMLDivElement>(null);
    const [isPointerMoved, setPointerMoved] = useState(false); // Track if the pointer has moved
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    }); // Track mouse position

    useEffect(() => {
        const handlePointerMove = (event: PointerEvent) => {
            const { clientX, clientY } = event;
            const blob = blobRef.current;

            // Update the mouse position
            setPosition({ x: clientX, y: clientY });

            if (blob) {
                const blobSize = blob.offsetWidth / 2; // Get half of the blob's size

                if (!isPointerMoved) {
                    // On the first pointer move, position the blob immediately without animation
                    blob.style.left = `${clientX - blobSize}px`;
                    blob.style.top = `${clientY - blobSize}px`;
                    setPointerMoved(true); // Set to true after the first move
                    blob.style.opacity = '0.5'; // Fade in when the first movement is detected
                } else {
                    // For subsequent movements, animate the blob with a delay
                    blob.animate(
                        {
                            left: `${clientX - blobSize}px`, // Offset the blob by its radius
                            top: `${clientY - blobSize}px`,
                        },
                        {
                            duration: 4000, // Adjust the duration to control the delay
                            fill: 'forwards',
                            easing: 'ease-out', // Smooth easing effect
                        }
                    );
                }
            }
        };

        document.body.addEventListener('pointermove', handlePointerMove);

        return () => {
            document.body.removeEventListener('pointermove', handlePointerMove);
        };
    }, [isPointerMoved]);

    return (
        <>
            <div
                className="custom-blob"
                ref={blobRef}
                style={{
                    opacity: 0, // Initially hidden
                    position: 'absolute', // Ensure the blob can move around freely
                    transition: 'opacity 0.5s ease-in-out', // Smooth fade-in effect
                }}
            ></div>
            <div className="custom-blob-blur"></div>
        </>
    );
};

export default Pointer;
