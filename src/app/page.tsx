import { Slider } from '../components/Slider';
import { Novedades } from '../components/home/Novedades';

export default function Home() {
    return (
        <>
            <Slider size={7} />
            <Novedades />
        </>
    );
}
