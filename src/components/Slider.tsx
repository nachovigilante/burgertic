'use client';

import {
    Dispatch,
    PointerEvent,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { twMerge } from 'tailwind-merge';
import SliderContext from '~/contexts/SliderContext';

const Slide = ({ image, index }: { image: string; index: number }) => {
    const {
        currentIndex,
        setCurrentIndex,
        startPos,
        setStartPos,
        isDragging,
        setIsDragging,
        currentTranslate,
        prevTranslate,
        slidesCount,
        animationID,
        setAnimationID,
        setPositionByIndex,
        animation,
        setCurrentTranslate,
    } = useContext(SliderContext);

    const pointerUp = (event: PointerEvent<HTMLDivElement>) => {
        cancelAnimationFrame(animationID);
        setIsDragging(false);
        const movedBy = currentTranslate - prevTranslate;

        // if moved enough negative then snap to next slide if there is one
        if (movedBy < -100 && currentIndex < slidesCount - 1)
            setCurrentIndex((i) => i + 1);

        // if moved enough positive then snap to previous slide if there is one
        if (movedBy > 100 && currentIndex > 0) setCurrentIndex((i) => i - 1);

        setPositionByIndex();
    };

    return (
        <div
            className="slide"
            onPointerDown={(event) => {
                setCurrentIndex(index);
                setStartPos(event.clientX);
                setIsDragging(true);
                setAnimationID(requestAnimationFrame(animation));
            }}
            onPointerUp={(event) => {
                cancelAnimationFrame(animationID);
                setIsDragging(false);
                const movedBy = currentTranslate - prevTranslate;

                // if moved enough negative then snap to next slide if there is one
                if (movedBy < -100 && currentIndex < slidesCount - 1)
                    setCurrentIndex((i) => i + 1);

                // if moved enough positive then snap to previous slide if there is one
                if (movedBy > 100 && currentIndex > 0)
                    setCurrentIndex((i) => i - 1);

                setPositionByIndex();

                // slider.classList.remove('grabbing');
            }}
            onPointerLeave={pointerUp}
            onPointerMove={(event) => {
                if (isDragging) {
                    const currentPosition = event.clientX;
                    setCurrentTranslate(
                        prevTranslate + currentPosition - startPos,
                    );
                }
            }}
        >
            <img src={image} alt="" onDragStart={(e) => e.preventDefault()} />
        </div>
    );
};

export const Slider = () => {
    const { isDragging, currentTranslate, sliderRef, currentIndex } =
        useContext(SliderContext);

    return (
        <>
            <div className="carrousel">
                <div
                    className={twMerge(
                        'slider-container',
                        isDragging && 'grabbing',
                    )}
                    ref={sliderRef}
                    style={{ transform: `translateX(${currentTranslate}px)` }}
                >
                    <Slide image="/assets/slider/slide1.jpeg" index={1} />
                    <Slide image="/assets/slider/slide2.jpeg" index={2} />
                    <Slide image="/assets/slider/slide3.jpeg" index={3} />
                    <Slide image="/assets/slider/slide4.jpeg" index={4} />
                </div>
            </div>
            <div className="carrousel-overlay">
                <div className="carrousel-controls">
                    <button id="prev">{`<`}</button>
                    <div id="bullets">
                        <div
                            className={twMerge(
                                'bullet',
                                currentIndex === 1 && 'active',
                            )}
                            data-id="1"
                        />
                        <div
                            className={twMerge(
                                'bullet',
                                currentIndex === 2 && 'active',
                            )}
                            data-id="2"
                        />
                        <div
                            className={twMerge(
                                'bullet',
                                currentIndex === 3 && 'active',
                            )}
                            data-id="3"
                        />
                        <div
                            className={twMerge(
                                'bullet',
                                currentIndex === 4 && 'active',
                            )}
                            data-id="4"
                        />
                        <div
                            className={twMerge(
                                'bullet',
                                currentIndex === 5 && 'active',
                            )}
                            data-id="5"
                        />
                        <div
                            className={twMerge(
                                'bullet',
                                currentIndex === 6 && 'active',
                            )}
                            data-id="6"
                        />
                        <div
                            className={twMerge(
                                'bullet',
                                currentIndex === 7 && 'active',
                            )}
                            data-id="7"
                        />
                    </div>
                    <button id="next">{'>'}</button>
                </div>
            </div>
        </>
    );
};
