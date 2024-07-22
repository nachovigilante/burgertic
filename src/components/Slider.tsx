'use client';

import { PointerEvent, useContext } from 'react';
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

    const pointerUp = () => {
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
            className="max-h-screen w-screen flex justify-center items-center"
            onPointerDown={(event) => {
                setCurrentIndex(index);
                setStartPos(event.clientX);
                setIsDragging(true);
                setAnimationID(requestAnimationFrame(animation));
            }}
            onPointerUp={pointerUp}
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
            <img
                className="w-full transition-transform duration-300 ease-in-out rounded-[4px] select-none object-cover"
                src={image}
                alt=""
                onDragStart={(e) => e.preventDefault()}
            />
        </div>
    );
};

export const Slider = ({ size }: { size: number }) => {
    const { isDragging, currentTranslate, sliderRef, currentIndex } =
        useContext(SliderContext);

    return (
        <>
            <div className="h-[600px] w-screen">
                <div
                    className={twMerge(
                        'h-full inline-flex overflow-hidden translate-x-0 will-change-transform transition-transform duration-300 ease-in-out cursor-grab',
                        isDragging && 'cursor-grabbing',
                    )}
                    ref={sliderRef}
                    style={{ transform: `translateX(${currentTranslate}px)` }}
                >
                    {Array.from({ length: size }, (_, i) => (
                        <Slide
                            key={i}
                            image={`/assets/slider/slide${i + 1}.png`}
                            index={i}
                        />
                    ))}
                </div>
            </div>
            <div className="absolute h-[600px] w-screen top-[88px] left-0 flex justify-center items-end px-5 py-[15px] z-50 pointer-events-none">
                <div className="flex justify-center items-center gap-5">
                    <button className="font-medium pointer-events-auto h-5 w-5 text-xl bg-transparent border-none text-white outline-none flex justify-center items-center hover:bg-transparent hover:font-bold">{`<`}</button>
                    <div className="flex justify-center items-center gap-2.5 pointer-events-auto">
                        {Array.from({ length: size }, (_, i) => (
                            <div
                                key={i}
                                className={twMerge(
                                    'h-2.5 w-2.5 rounded-full bg-white/50 cursor-pointer transition-[background-color] duration-300 ease-in-out hover:bg-white/80',
                                    currentIndex === i && 'bg-white',
                                )}
                                data-id={i + 1}
                            />
                        ))}
                    </div>
                    <button className="font-medium pointer-events-auto h-5 w-5 text-xl bg-transparent border-none text-white outline-none flex justify-center items-center hover:bg-transparent hover:font-bold">
                        {'>'}
                    </button>
                </div>
            </div>
        </>
    );
};
