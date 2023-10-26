'use client';

import {
    Dispatch,
    PointerEvent,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

const Slide = ({
    image,
    index,
    setCurrentIndex,
    setStartPos,
    setIsDragging,
    currentTranslate,
    prevTranslate,
    currentIndex,
    slidesCount,
    setPositionByIndex,
    isDragging,
    startPos,
    animationID,
    setAnimationID,
    animation,
}: {
    image: string;
    index: number;
    setCurrentIndex: Dispatch<SetStateAction<number>>;
    setStartPos: (pos: number) => void;
    setIsDragging: (isDragging: boolean) => void;
    currentTranslate: number;
    prevTranslate: number;
    currentIndex: number;
    slidesCount: number;
    setPositionByIndex: () => void;
    isDragging: boolean;
    startPos: number;
    animationID: number;
    setAnimationID: (id: number) => void;
    animation: () => void;
}) => {
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
                    currentIndex += 1;

                // if moved enough positive then snap to previous slide if there is one
                if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

                setPositionByIndex();

                // slider.classList.remove('grabbing');
            }}
            onPointerLeave={pointerUp}
            onPointerMove={(event) => {
                if (isDragging) {
                    const currentPosition = event.clientX;
                    currentTranslate =
                        prevTranslate + currentPosition - startPos;
                }
            }}
        >
            <img src={image} alt="" onDragStart={(e) => e.preventDefault()} />
        </div>
    );
};

export const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startPos, setStartPos] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);
    const [slidesCount, setSlidesCount] = useState(4);
    const [animationID, setAnimationID] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    function setPositionByIndex() {
        setCurrentTranslate(currentIndex * -window.innerWidth);
        // bulletsContainer.querySelector('.active').classList.remove('active');
        // bulletsContainer.children[currentIndex].classList.add('active');
        setPrevTranslate(currentIndex * -window.innerWidth);
    }

    function animation() {
        if (isDragging) requestAnimationFrame(animation);
    }

    useEffect(() => {
        window.addEventListener('resize', setPositionByIndex);
        window.oncontextmenu = function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        };

        const interval = setInterval(() => {
            if (currentIndex >= slidesCount - 1) {
                setCurrentIndex(0);
            } else {
                setCurrentIndex(currentIndex + 1);
            }
            setPositionByIndex();
        }, 3000);

        return () => {
            window.removeEventListener('resize', setPositionByIndex);
            clearInterval(interval);
        };
    });

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
                    <Slide
                        image="/assets/slider/slide1.jpeg"
                        index={1}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                        setStartPos={setStartPos}
                        setIsDragging={setIsDragging}
                        currentTranslate={currentTranslate}
                        prevTranslate={prevTranslate}
                        slidesCount={slidesCount}
                        setPositionByIndex={setPositionByIndex}
                        isDragging={isDragging}
                        startPos={startPos}
                        animationID={animationID}
                        setAnimationID={setAnimationID}
                        animation={animation}
                    />
                    <Slide
                        image="/assets/slider/slide2.jpeg"
                        index={2}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                        setStartPos={setStartPos}
                        setIsDragging={setIsDragging}
                        currentTranslate={currentTranslate}
                        prevTranslate={prevTranslate}
                        slidesCount={slidesCount}
                        setPositionByIndex={setPositionByIndex}
                        isDragging={isDragging}
                        startPos={startPos}
                        animationID={animationID}
                        setAnimationID={setAnimationID}
                        animation={animation}
                    />
                    <Slide
                        image="/assets/slider/slide3.jpeg"
                        index={3}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                        setStartPos={setStartPos}
                        setIsDragging={setIsDragging}
                        currentTranslate={currentTranslate}
                        prevTranslate={prevTranslate}
                        slidesCount={slidesCount}
                        setPositionByIndex={setPositionByIndex}
                        isDragging={isDragging}
                        startPos={startPos}
                        animationID={animationID}
                        setAnimationID={setAnimationID}
                        animation={animation}
                    />
                    <Slide
                        image="/assets/slider/slide4.jpeg"
                        index={4}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                        setStartPos={setStartPos}
                        setIsDragging={setIsDragging}
                        currentTranslate={currentTranslate}
                        prevTranslate={prevTranslate}
                        slidesCount={slidesCount}
                        setPositionByIndex={setPositionByIndex}
                        isDragging={isDragging}
                        startPos={startPos}
                        animationID={animationID}
                        setAnimationID={setAnimationID}
                        animation={animation}
                    />
                </div>
            </div>
            <div className="carrousel-overlay">
                <div className="carrousel-controls">
                    <button id="prev">{`<`}</button>
                    <div id="bullets">
                        <div className="bullet" data-id="1"></div>
                        <div className="bullet" data-id="2"></div>
                        <div className="bullet" data-id="3"></div>
                        <div className="bullet" data-id="4"></div>
                        <div className="bullet" data-id="5"></div>
                        <div className="bullet" data-id="6"></div>
                        <div className="bullet" data-id="7"></div>
                    </div>
                    <button id="next">{'>'}</button>
                </div>
            </div>
        </>
    );
};
