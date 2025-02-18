import React, { useRef, useState } from 'react'
import profileUser from "../../../assets/images/no-images-available.jpg";
import storiesImg from "../../../assets/images/bride-and-groom-list-img1.jpg";
import StoryModel from './StoryModel';
import Slider from 'react-slick';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import BridenGroomServices from '../../../services/BridenGroomServices';
import Swal from 'sweetalert2';
import ValidateAuthenticationKey from '../../../utils/ValidationAuthenticationKey';
import NoActiveDataFound from '../../../utils/NoActiveDataFound';
import Loader from '../../../utils/Loader/Loader';
const StoryList = ({ }) => {
    const pageSize = 7;
    const queryClient = useQueryClient()



    let StoriesModel = {
        dots: true,
        arrows: false,
        infinite: false,
        autoplay: true,
        pauseOnHover: true,
        autoplaySpeed: 8000,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        afterChange: (current) => {
            setActiveIndex(current);
        },
    };





    // 
    const isNext = useRef(null)
    // 
    const [activeIndex, setActiveIndex] = useState(0); // State to store the active image index
    const [stories, setStories] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [toggleFetchQuery, setToggleFetchQuery] = useState(false)
    const [hasMore, setHasMore] = useState(true);
    const [toggleStoriesModel, setToggleStoriesModel] = useState(false);
    const [story, setStory] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const sliderRef = useRef(null);

    const handleStoryModel = (e, data) => {
        setStory(data)
        setToggleStoriesModel(true)
    };

    const handleCloseStoryModel = () => {
        setToggleStoriesModel(false)
        setStory(false)
        // console.log(storyListData, "storyListData")
        if (currentPage === 1) {
            queryClient.refetchQueries("storylist");
        }  else {
            queryClient.refetchQueries(["storylist", currentPage]);        }

    }
    const handleToggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState)
    };










    const handleDelete = (_, data) => {
        const id = data?.stories[activeIndex].id
        Swal.fire({
            title: "Are you sure you want to delete this?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteStory.mutate({ id: id });
            }
        });
    };


    const deleteStory = useMutation(
        (formdata) => {
            return BridenGroomServices.deleteStory(formdata);
        },
        {
            onSuccess: async (data) => {
                Swal.fire({
                    title: "Successfull",
                    text: "Deleted",
                    icon: "success",
                });
                // queryClient.invalidateQueries("subscription-organization");
                // setStories([])

                // setCurrentPage(1)
                // await fetchStories(currentPage);
                handleCloseStoryModel()

                // setActiveIndex(0)

            },
            onError: (err) => {
                Swal.fire({
                    title: "Error",
                    text: err?.response?.data?.error || err?.message,
                    icon: "error",
                });
                // alert(err?.response?.data?.error || err?.message);
            },
        }
    );


    const { data: storyListData, isLoading: loading } = useQuery(
        ['storylist', currentPage],
        async () => {
            const queryParams = `?page=${currentPage}&page_size=${pageSize}`;
            const response = await BridenGroomServices.getStory(queryParams);
            return response;
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                const { results, count, next } = data.data;

                console.log('Debug info:', {
                    currentPage,
                    next,
                    sliderRefExists: !!sliderRef.current,
                    currentStoriesLength: stories.length,
                    newResultsLength: results.length
                });

                isNext.current = Boolean(!!next)

                setStories((prevStories) => {
                    // Create a Map with unique items based on their IDs
                    const uniqueStories = new Map();

                    // Add previous stories to the map
                    prevStories.forEach((story) => {
                        uniqueStories.set(story.id, story);
                    });

                    // Add new results to the map, overwriting duplicates
                    results.forEach((story) => {
                        uniqueStories.set(story.id, story);
                    });

                    // Return an array of unique values
                    return Array.from(uniqueStories.values());
                });

                // Handle focusing after state update
                if (currentPage > 1) {
                    const focusIndex = (currentPage - 1) * pageSize;
                    console.log('Attempting to focus to index:', focusIndex);

                    requestAnimationFrame(() => {
                        if (sliderRef.current) {
                            console.log('Focusing to slide:', focusIndex);
                            sliderRef.current.slickGoTo(focusIndex);
                        } else {
                            console.log('Slider ref not available');
                        }
                    });
                }

                setHasMore(count > (currentPage * pageSize));
            },
            onError: (err) => {
                if (err?.response?.status === 401) {
                    ValidateAuthenticationKey(
                        err?.response?.status,
                        "Your login session has expired. Please log in again."
                    );
                    return;
                }
                Swal.fire({
                    title: "Error",
                    text: err?.response?.data?.message || err?.message,
                    icon: "error",
                });
            },
        }
    );

    const [previousSlide, setPreviousSlide] = useState(0);
    const isNavigatingBackRef = useRef(false);

    // Add handlers for both prev and next button clicks
    const CustomPrevArrow = ({ className, onClick }) => (
        <button
            className={className}
            onClick={(e) => {
                isNavigatingBackRef.current = true;
                console.log("Prev clicked - isNavigatingBackRef set to:", isNavigatingBackRef.current);
                if (onClick) onClick(e);
            }}
        >
            Previous
        </button>
    );

    const CustomNextArrow = ({ className, onClick }) => (
        <button
            className={className}
            onClick={(e) => {
                isNavigatingBackRef.current = false;
                console.log("Next clicked - isNavigatingBackRef set to:", isNavigatingBackRef.current);
                if (onClick) onClick(e);
            }}
        >
            Next
        </button>
    );
    const handleAfterChange = (currentSlide) => {
        const slidesToShow = 6;
        const slidesToScroll = 6;
        const remainingSlides = stories.length - (currentSlide + slidesToShow);
        const shouldLoadMore = remainingSlides <= slidesToScroll;

        console.log("Slide Change Debug:", {
            currentSlide,
            previousSlide,
            isNavigatingBack: isNavigatingBackRef.current,
            remainingSlides,
            shouldLoadMore,
            hasMore,
            isNext,
            storiesLength: stories.length
        });

        // Only load more if not navigating back
        if (hasMore && !isNavigatingBackRef.current && shouldLoadMore && isNext.current) {
            console.log("✅ Loading next page");
            setCurrentPage(prev => prev + 1);
        } else {
            console.log("❌ Not loading next page. isNavigatingBack:", isNavigatingBackRef.current);
        }
        setPreviousSlide(currentSlide);
    };




    let StoriesList = {
        dots: false,
        // arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1299,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
        afterChange: handleAfterChange,
    };

    const [sliderConfig, setSliderConfig] = useState(StoriesList)




    return (

        <>
            {loading ? <Loader /> : stories?.length == 0 ? <NoActiveDataFound msg={"No active data found"} /> : sliderConfig && <Slider ref={sliderRef} {...sliderConfig}>
                {stories.map((story, index) => (
                    <div key={story.id || index} className="stories-lsd-items" onClick={(e) => handleStoryModel(e, story)}>
                        <div className="stories-img-wrap">
                            <div className="stories-img">
                                <img
                                    className="img-fluid"
                                    src={(story?.stories?.[0]?.upload_url) || storiesImg}
                                    alt="Story thumbnail"
                                />
                            </div>
                            <div className="profile-img">
                                <img
                                    className="img-fluid"

                                    src={(story?.photos?.[0]?.upload_url) || profileUser}
                                    alt="Profile"
                                />
                            </div>
                            <div className="profile-name">
                                <h4>
                                    {story?.user?.first_name} {story?.user?.last_name}
                                </h4>
                            </div>
                        </div>
                    </div>
                ))}
                {loading && stories.length > 0 && (
                    <div className="stories-lsd-items">
                        <ButtonLoader />
                    </div>
                )}
            </Slider>}
            <StoryModel handleDelete={handleDelete} story={story} handleCloseStoryModel={handleCloseStoryModel} StoriesModel={StoriesModel} toggleStoriesModel={toggleStoriesModel} dropdownOpen={dropdownOpen} handleToggleDropdown={handleToggleDropdown} handleStoryModel={handleStoryModel} />


        </>
    )
}

export default StoryList