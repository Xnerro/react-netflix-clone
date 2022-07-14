import {
    Box,
    Button,
    Heading,
    HStack,
    keyframes,
    VStack,
    Input,
    useBoolean,
} from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import React, { FC, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Carousel } from './carousel';
import { useNavigate } from 'react-router-dom';

const animationTop = keyframes`
    0%{top: 0%}
    100%{top: -50%}
`;

const animationBottom = keyframes`
    0%{bottom: 0%}
    100%{bottom: -50%}
`;

const textAnimation = keyframes`
    0%{opacity: 0}
    70%{opacity: 1}
    100%{opacity: 0}
`;

const textAnimation2 = keyframes`
    0%{opacity: 0}
    80%{opacity: 0}
    100%{opacity: 1}
`;

const movieAnimation = keyframes`
    0%{opacity: 0}
    80%{opacity: 0}
    100%{opacity: 1}
`;

export const MoviePage: FC = () => {
    const [height, setHeight] = useState({
        height: '100vh',
        overflow: 'hidden',
        top: '0',
        opacity: '0',
    });
    const navigate = useNavigate();
    const [flag, setFlag] = useBoolean();
    const [query, setQuery] = useState<String>('');

    useLayoutEffect(() => {
        setTimeout(() => {
            setHeight({
                ...height,
                height: '120vh',
                overflow: 'auto',
                top: '100vh',
                opacity: '1',
            });
        }, 7000);
    });

    return (
        <>
            <Box position="absolute" w="100%" minH="100vh" overflow="hidden">
                <Box display="flex" alignItems="center" mt="2vh">
                    <Button
                        color="white"
                        bg="transparent"
                        _active={{
                            background: 'transparent',
                        }}
                        _hover={{
                            background: 'transparent',
                        }}
                        onClick={() => navigate('../')}
                    >
                        &lang;
                    </Button>
                    <Button
                        color="white"
                        bg="transparent"
                        _active={{
                            background: 'transparent',
                        }}
                        _hover={{
                            background: 'transparent',
                        }}
                        fontWeight="thin"
                        onClick={setFlag.toggle}
                    >
                        Search
                    </Button>
                    {flag && (
                        <>
                            <Input
                                w={['40%', '40%', '30%', '30%']}
                                fontSize={['2vh', '2vh', '1vw', '1vw']}
                                color="white"
                                placeholder="Search"
                                variant="outline"
                                colorScheme="whiteAlpha"
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        navigate(`search?query=${query}`);
                                    }
                                }}
                            />
                            <Button
                                colorScheme="whiteAlpha"
                                variant="ghost"
                                onClick={() =>
                                    navigate(`search?query=${query}`)
                                }
                            >
                                <BiSearch />
                            </Button>
                        </>
                    )}
                </Box>
                <Box
                    as={motion.div}
                    animation={`${animationTop} 3s ease `}
                    position="absolute"
                    top="-50%"
                    h="50%"
                    bg="#000"
                    w="100%"
                ></Box>
                <Box
                    as={motion.div}
                    position="absolute"
                    animation={`${animationBottom} 3s ease `}
                    bottom="-50%"
                    h="50%"
                    bg="#000"
                    w="100%"
                ></Box>
                <Heading
                    opacity="0"
                    fontSize="5vw"
                    color="#fff"
                    position="absolute"
                    top="50%"
                    left="50%"
                    textAlign="center"
                    w="80%"
                    transform="translate(-50%, -50%)"
                    animation={`${textAnimation} 6s ease-in`}
                >
                    Welcome To React Movie
                </Heading>
                <Heading
                    opacity="1"
                    textShadow="0px 4px 0px white, 0px 0px 0px black, 0px 4px 0px white"
                    fontSize={['8vw', '8vw', '5vw', '5vw']}
                    color="transparent"
                    position="absolute"
                    top="20%"
                    left="50%"
                    textAlign="center"
                    w="80%"
                    transform="translate(-50%, -50%)"
                    animation={`${textAnimation2} 9s ease-out`}
                >
                    Enjoy The Movies
                </Heading>
                <Box
                    w="90vw"
                    position="absolute"
                    top="60%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    height="50vh"
                    display="flex"
                    justifyContent="center"
                    flexDir="column"
                    as={motion.div}
                    animation={`${movieAnimation} 9s ease-out`}
                >
                    <Heading
                        textAlign="center"
                        color="white"
                        h={['12.5vh', '12.5vh', '20vh', '20vh']}
                        fontSize={['6vw', '6vw', '4vw', '4vw']}
                    >
                        Popular
                    </Heading>
                    <HStack
                        color="white"
                        w="100%"
                        h="20vh"
                        display="flex"
                        justifyContent="center"
                        position="relative"
                    >
                        <Carousel url="https://api.themoviedb.org/3/movie/popular?api_key=71350e55b9bfcc9917c77337bb9b1a62&language=en-US&page=" />
                    </HStack>
                </Box>
            </Box>
            <Box
                position="absolute"
                color="#fff"
                top={height.top}
                backgroundColor="black"
                boxShadow="-20px 0 2000px 20px black"
                w="100%"
                h={height.height}
                overflow={height.overflow}
                opacity={height.opacity}
                minH="100vh"
            >
                <VStack
                    mt="40vh"
                    color="white"
                    w="100%"
                    h="20vh"
                    display="flex"
                    justifyContent="center"
                    gap={['100', '100', '200', '200']}
                >
                    <Box
                        w="80%"
                        h="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDir="column"
                    >
                        <Heading
                            mt="5vw"
                            w="90%"
                            fontWeight="hairline"
                            fontSize={['6vw', '6vw', '4vw', '4vw']}
                        >
                            Top Rated
                        </Heading>
                        <Carousel url="https://api.themoviedb.org/3/movie/top_rated?api_key=71350e55b9bfcc9917c77337bb9b1a62&language=en-US&page=" />
                    </Box>
                    <Box
                        w="80%"
                        h="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDir="column"
                    >
                        <Heading
                            mt="10vw"
                            w="90%"
                            fontWeight="hairline"
                            fontSize={['6vw', '6vw', '4vw', '4vw']}
                        >
                            Upcoming Movie
                        </Heading>
                        <Carousel url="https://api.themoviedb.org/3/movie/upcoming?api_key=71350e55b9bfcc9917c77337bb9b1a62&language=en-US&page=" />
                    </Box>
                </VStack>
            </Box>
        </>
    );
};
