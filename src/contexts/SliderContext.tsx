import {
    Dispatch,
    MutableRefObject,
    ReactNode,
    SetStateAction,
    createContext,
    useEffect,
    useRef,
    useState,
} from 'react';

type SliderContextType = {
    currentIndex: number;
    setCurrentIndex: Dispatch<SetStateAction<number>>;
    startPos: number;
    setStartPos: Dispatch<SetStateAction<number>>;
    isDragging: boolean;
    setIsDragging: Dispatch<SetStateAction<boolean>>;
    currentTranslate: number;
    setCurrentTranslate: Dispatch<SetStateAction<number>>;
    prevTranslate: number;
    setPrevTranslate: Dispatch<SetStateAction<number>>;
    slidesCount: number;
    setSlidesCount: Dispatch<SetStateAction<number>>;
    animationID: number;
    setAnimationID: Dispatch<SetStateAction<number>>;
    sliderRef: MutableRefObject<HTMLDivElement | null> | null;
    setPositionByIndex: () => void;
    animation: () => void;
};

const SliderContext = createContext<SliderContextType>({
    currentIndex: 0,
    setCurrentIndex: () => {},
    startPos: 0,
    setStartPos: () => {},
    isDragging: false,
    setIsDragging: () => {},
    currentTranslate: 0,
    setCurrentTranslate: () => {},
    prevTranslate: 0,
    setPrevTranslate: () => {},
    slidesCount: 0,
    setSlidesCount: () => {},
    animationID: 0,
    setAnimationID: () => {},
    sliderRef: null,
    setPositionByIndex: () => {},
    animation: () => {},
});

export const SliderProvider = ({ children }: { children: ReactNode }) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [startPos, setStartPos] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);
    const [slidesCount, setSlidesCount] = useState(7);
    const [animationID, setAnimationID] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    function updatePosition() {
        setCurrentTranslate(currentIndex * -window.innerWidth);
        setPrevTranslate(currentIndex * -window.innerWidth);
    }

    function animation() {
        if (isDragging) requestAnimationFrame(animation);
    }

    useEffect(() => {
        window.addEventListener('resize', updatePosition);
        window.oncontextmenu = function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        };

        const interval = setInterval(() => {
            console.log('AAAAAA');
            setCurrentIndex((currentIndex) => (currentIndex + 1) % slidesCount);
        }, 3000);

        return () => {
            window.removeEventListener('resize', updatePosition);
            clearInterval(interval);
        };
    });

    useEffect(() => {
        updatePosition();
    }, [currentIndex]);

    return (
        <SliderContext.Provider
            value={{
                currentIndex,
                setCurrentIndex,
                startPos,
                setStartPos,
                isDragging,
                setIsDragging,
                currentTranslate,
                setCurrentTranslate,
                prevTranslate,
                setPrevTranslate,
                slidesCount,
                setSlidesCount,
                animationID,
                setAnimationID,
                sliderRef,
                setPositionByIndex: updatePosition,
                animation,
            }}
        >
            {children}
        </SliderContext.Provider>
    );
};

export default SliderContext;
