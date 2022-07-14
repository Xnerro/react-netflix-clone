import React, { FC, useEffect, useState } from 'react';
import {
    Button,
    Box,
    Image,
    AspectRatio,
    Text,
    Spinner,
} from '@chakra-ui/react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';

const responsive = {
    0: { items: 3 },
    762: { items: 4 },
    1024: { items: 6 },
};

interface Props {
    url: string;
}

export const Carousel: FC<Props> = (props) => {
    const [thumbIndex, setThumbIndex] = useState(0);
    const [movie, setMovie] = useState<any[] | []>(Array);
    const [page, setPage] = useState<number>(1);
    const [load, setLoad] = useState<boolean>(false);

    const getMovie = async () => {
        await axios.get(`${props.url + page}`).then((res) => {
            var arr: unknown[] | any = [];
            res.data.results.map((x: any, i: number) => {
                arr.push(
                    <AspectRatio
                        ratio={1}
                        className="item"
                        data-value={`${i + 1}`}
                        h="35vh"
                        _notFirst={{
                            marginRight: ['5.5vh', '5.5vh', '1.5vw', '1.5vw'],
                        }}
                    >
                        <Box
                            display="flex"
                            flexDir="column"
                            alignItems="flex-start"
                        >
                            <Image
                                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${x.poster_path}`}
                                alt={x.title}
                                h={['20vh', '20vh', '30vh', '30vh']}
                                objectFit={'cover'}
                            />
                            <Text
                                textAlign="center"
                                h="3.25vh"
                                fontSize={['2.2vw', '2.2vw', '1.3vw', '1vw']}
                            >
                                {x.title}
                            </Text>
                        </Box>
                    </AspectRatio>
                );
            });
            setMovie([...movie, ...arr]);
        });
    };

    useEffect(() => {
        getMovie();
    }, [page]);

    const slideNext = () => {
        if (thumbIndex < movie.length - 6 && !load) {
            setThumbIndex(thumbIndex + 1);
        } else if (!load) {
            setLoad(true);
            setPage(page + 1);
            setTimeout(() => {
                setLoad(false);
            }, 1000);
        }
    };

    const slidePrev = () => {
        if (thumbIndex > 0) {
            setThumbIndex(thumbIndex - 1);
        }
    };

    return (
        <>
            <Box
                className="thumbs"
                w="85%"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Button
                    bg="transparent"
                    onClick={slidePrev}
                    _hover={{
                        background: 'none',
                        color: 'gray',
                    }}
                    _focus={{
                        background: 'none',
                    }}
                    _active={{
                        color: 'gray',
                    }}
                >
                    &lang;
                </Button>
                <AliceCarousel
                    activeIndex={thumbIndex}
                    disableButtonsControls={true}
                    disableDotsControls={true}
                    mouseTracking
                    items={movie}
                    responsive={responsive}
                />
                {load && (
                    <Box
                        position="absolute"
                        bg="blackAlpha.700"
                        h="35vh"
                        w="inherit"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Spinner size="xl" />
                    </Box>
                )}
                <Button
                    bg="transparent"
                    onClick={slideNext}
                    _hover={{
                        background: 'none',
                        color: 'gray',
                    }}
                    _focus={{
                        background: 'none',
                    }}
                    _active={{
                        color: 'gray',
                    }}
                >
                    &rang;
                </Button>
            </Box>
        </>
    );
};
