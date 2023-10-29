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
                setPositionByIndex,
                animation,
            }}
        >
            {children}
        </SliderContext.Provider>
    );
};

export default SliderContext;
