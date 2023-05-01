import React, { useState, useEffect, useRef, forwardRef } from "react";
import { getLatestUploads } from "../../api/movie";
import { useNotification } from "../hooks";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import {Link} from 'react-router-dom';


let count = 0;
let interValId;
const HeroSlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState({});
  const [slides, setSlides] = useState([]);
  const [cloneSlide, setCloneSlide] = useState({});
  const [visible, setVisible] = useState(true);
  const [upNext, setUpNext] = useState([]);
  const slideRef = useRef();
  const clonedSlideRef = useRef();
  const { updateNotification } = useNotification();

  const fetchLatestUploads = async () => {
    const { error, movies } = await getLatestUploads();

    if (error) return updateNotification("error", error);
    setSlides([...movies]);
    setCurrentSlide(movies[0]);
  };

  const updateUpNext = (currentIndex) => {
    if (!slides.length) return;
    const upNextCount = currentIndex + 1;
    const end = upNextCount + 3;

    let newSlides = [...slides];
    newSlides.slice(upNextCount, end);

    if (!newSlides.length) {
      newSlides = [...slides].slice(0, 3);
    }

    setUpNext([...newSlides]);
  };

  const handleOnNextClick = () => {
    pauseSlideShow();
    setCloneSlide(slides[count]);
    count = (count + 1) % slides.length;
    console.log(
      "🚀 ~ file: HeroSlideShow.jsx:29 ~ handleOnNextClick ~ count:",
      count
    );
    setCurrentSlide(slides[count]);

    clonedSlideRef.current.classList.add("slide-out-to-left");
    slideRef.current.classList.add("slide-in-from-right");
    updateUpNext(count);
  };

  const handleOnPrevClick = () => {
    pauseSlideShow();
    setCloneSlide(slides[count]);
    count = (count + slides.length - 1) % slides.length;
    setCurrentSlide(slides[count]);

    clonedSlideRef.current.classList.add("slide-out-to-right");
    slideRef.current.classList.add("slide-in-from-left");
    updateUpNext(count);
  };

  const handleAnimationEnd = () => {
    const classes = [
      "slide-out-to-left",
      " slide-in-from-right",
      "slide-out-to-right",
      "slide-in-from-left",
    ];
    slideRef.current.classList.remove(...classes);
    clonedSlideRef.current.classList.remove(...classes);
    setCloneSlide({});
    startSlideShow();
  };

  const startSlideShow = () => {
    interValId = setInterval(handleOnNextClick, 3500);
  };
  const pauseSlideShow = () => {
    clearInterval(interValId);
  };

  const handleOnVisibilityChange = () => {
    const visibility = document.visibilityState;
    if (visibility === "hidden") setVisible(false);
    if (visibility === "visible") setVisible(true);
  };

  useEffect(() => {
    if (slides.length > 1 && visible) startSlideShow();
    else pauseSlideShow();
    updateUpNext(count);
    // eslint-disable-next-line
  }, [slides.length, visible]);

  useEffect(() => {
    fetchLatestUploads();
    document.addEventListener("visibilitychange", handleOnVisibilityChange);
    return () => {
      pauseSlideShow();
      document.removeEventListener(
        "visibilitychange",
        handleOnVisibilityChange
      );
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full flex ">
      {/* slide show section-=========== */}
      <div className="w-4/5 aspect-video relative overflow-hidden">
        {/* current slide */}
        <Slide
          ref={slideRef}
          title={currentSlide.title}
          src={currentSlide.poster}
          id={currentSlide.id}
        />
        {/* cloned slide */}
        <Slide
          ref={clonedSlideRef}
          onAnimationEnd={handleAnimationEnd}
          className=" absolute inset-0"
          src={cloneSlide?.poster}
          title={cloneSlide.title}
          id={currentSlide.id}
        />

        <SlideShowController
          onNextClick={handleOnNextClick}
          onPrevClick={handleOnPrevClick}
        />
      </div>

      {/* up next section============= */}
      <div className="w-1/5 space-y-3 px-3 ">
        <h1 className="font-semibold text-2xl text-primary dark:text-white">
          Up Next
        </h1>
        {upNext.map(({ poster, id }) => {
          return (
            <img
              key={id}
              src={poster}
              alt=""
              className="aspect-video object-cover rounded"
            />
          );
        })}
      </div>
    </div>
  );
};

const SlideShowController = ({ onPrevClick, onNextClick }) => {
  const btnClass =
    "bg-primary rounded border-2 text-white text-xl p-2 outline-none";
  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between px-2 outline-none">
      <button type="button" onClick={onPrevClick} className={btnClass}>
        <AiOutlineDoubleLeft />{" "}
      </button>
      <button type="button" onClick={onNextClick} className={btnClass}>
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
};

const Slide = forwardRef((props, ref) => {
  const { src, id ,title, className = "", ...rest } = props;
  return (
    <Link to={'/movie/'+ id} ref={ref} className={"w-full cursor-pointer block " + className} {...rest}>
      {src ? (
        <img
          //   onAnimationEnd={handleAnimationEnd}
          className="aspect-video object-cover "
          src={src}
          alt=""
        />
      ) : null}
      {title ? (
        <div className="absolute inset-0 flex flex-col justify-end py-3 bg-gradient-to-t from-white dark:from-primary">
          <h1 className="font-semibold text-4xl dark:text-highlight-dark text-highlight ">
            {title}
          </h1>
        </div>
      ) : null}
    </Link>
  );
});

export default HeroSlideShow;
