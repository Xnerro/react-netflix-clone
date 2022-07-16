import {
    Box,
    Heading,
    Input,
    useBoolean,
    Button,
    HStack,
    Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Card } from './card';

interface Result {
    tv?: any[];
    movie?: any[];
    people?: any[];
}

interface Total {
    tv?: number;
    movie?: number;
    people?: number;
}

export const SearchPage: FC = () => {
    const queryString = window.location.search;
    const param = new URLSearchParams(queryString);

    const [query, setQuery] = useState<{
        search?: string | any;
        query?: string | any;
    }>({
        query: '',
    });
    const [result, setResult] = useState<Result>();
    const [total, setTotal] = useState<Total>();
    const [show, setShow] = useState('movie');
    const [flag, setFlag] = useBoolean();
    const navigate = useNavigate();

    const getAll = async (x: any | null) => {
        const req1 = await axios.get(
            `https://api.themoviedb.org/3/search/tv?api_key=71350e55b9bfcc9917c77337bb9b1a62&language=en-US&page=1&query=${x}&include_adult=true`
        );
        const req2 = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=71350e55b9bfcc9917c77337bb9b1a62&language=en-US&query=${x}&page=1&include_adult=true`
        );
        const req3 = await axios.get(
            `https://api.themoviedb.org/3/search/person?api_key=71350e55b9bfcc9917c77337bb9b1a62&language=en-US&query=${x}&page=1&include_adult=true`
        );

        await axios.all([req1, req2, req3]).then(
            axios.spread((...res) => {
                console.log(res);
                let arr1: any[] = [];
                let arr2: any[] = [];
                let arr3: any[] = [];
                res[0].data.results.map((x: any) => {
                    arr1.push({
                        title: x.name,
                        poster: x.poster_path,
                        rate: x.vote_average,
                    });
                });
                res[1].data.results.map((x: any) => {
                    arr2.push({
                        title: x.title,
                        poster: x.poster_path,
                        rate: x.vote_average,
                    });
                });
                res[2].data.results.map((x: any) => {
                    arr3.push({
                        title: x.name,
                        poster: x.profile_path,
                        rate: x.popularity,
                    });
                });
                setTotal({
                    ...total,
                    tv: res[0].data.total_results,
                    movie: res[1].data.total_results,
                    people: res[2].data.total_results,
                });
                setResult({ ...result, tv: arr1, movie: arr2, people: arr3 });
            })
        );
    };

    useEffect(() => {
        getAll(param.get('query'));
    }, [param.get('query')]);

    return (
        <>
            <Box
                position="relative"
                color="white"
                w="100%"
                display="flex"
                flexDir="column"
                alignItems="center"
                pb="10px"
            >
                <Box
                    display="flex"
                    alignItems="center"
                    mt="2vh"
                    alignSelf="start"
                    w="100%"
                >
                    <Button
                        color="white"
                        bg="transparent"
                        _active={{
                            background: 'transparent',
                        }}
                        _hover={{
                            background: 'transparent',
                        }}
                        onClick={() => navigate(-1)}
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
                                onChange={(e) =>
                                    setQuery({
                                        query: e.target.value,
                                    })
                                }
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        navigate(`?query=${query.query}`);
                                    }
                                }}
                            />
                            <Button
                                colorScheme="whiteAlpha"
                                variant="ghost"
                                onClick={() =>
                                    navigate(`?query=${query.query}`)
                                }
                            >
                                <BiSearch />
                            </Button>
                        </>
                    )}
                </Box>
                <Box textAlign="start" w="90%" mt="3vw">
                    <Heading fontSize={['5vw', '5vw', '3vw', '3vw']}>
                        Result Found: {param.get('query')}
                    </Heading>
                    <Box display="flex">
                        <Input
                            w="100%"
                            fontSize={['2vh', '2vh', '2vw', '1vw']}
                            color="white"
                            placeholder="Search for a movie, tv show, people and more ...."
                            variant="outline"
                            colorScheme="whiteAlpha"
                            onChange={(e) =>
                                setQuery({
                                    query: e.target.value,
                                })
                            }
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    navigate(`?query=${query.query}`);
                                }
                            }}
                        />
                        <Button
                            colorScheme="whiteAlpha"
                            variant="ghost"
                            onClick={() => navigate(`?query=${query.query}`)}
                        >
                            <BiSearch />
                        </Button>
                    </Box>
                    <HStack
                        gap={[3, 3, 5, 5]}
                        mt={['1vh', '1vh', '1vw', ' 1vw']}
                        overflow="auto"
                    >
                        <Text
                            p={['0.5vh', '0.5vh', '0.5vw', '0.5vw']}
                            cursor="pointer"
                            borderRadius="md"
                            bg="blackAlpha.500"
                            fontSize={['1.5vh', '1.5vh', '2vw', '1vw']}
                            onClick={() => setShow('movie')}
                        >
                            Movie {total?.movie}
                        </Text>
                        <Text
                            p={['0.5vh', '0.5vh', '0.5vw', '0.5vw']}
                            cursor="pointer"
                            borderRadius="md"
                            bg="blackAlpha.500"
                            fontSize={['1.5vh', '1.5vh', '2vw', '1vw']}
                            onClick={() => setShow('tv')}
                        >
                            TV Show {total?.tv}
                        </Text>
                        <Text
                            p={['0.5vh', '0.5vh', '0.5vw', '0.5vw']}
                            cursor="pointer"
                            borderRadius="md"
                            bg="blackAlpha.500"
                            fontSize={['1.5vh', '1.5vh', '2vw', '1vw']}
                            onClick={() => setShow('people')}
                        >
                            People {total?.people}
                        </Text>
                    </HStack>
                </Box>
                <Box
                    mt={'2vw'}
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    gap={[2, 2, 5, 5]}
                >
                    {show === 'movie' &&
                        result?.movie?.map((x) => <Card url={x} />)}
                    {show === 'tv' && result?.tv?.map((x) => <Card url={x} />)}
                    {show === 'people' &&
                        result?.people?.map((x) => <Card url={x} />)}
                </Box>
            </Box>
        </>
    );
};
