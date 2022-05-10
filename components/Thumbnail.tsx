import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { Movie } from "../typing";

interface Props {
    movie: Movie
}
const Thumbnail = ({ movie }: Props) => {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

    return (
        <div onClick={() => { setShowModal(true); setCurrentMovie(movie) }} className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
            <Image
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path
                    }`}
                className="rounded-sm object-cover md:rounded"
                layout="fill"
            />
            <div className="relative bottom-0 p-2 z-20 w-max-[180px]">{movie.title || movie.name}</div>
        </div>
    )
}

export default Thumbnail;