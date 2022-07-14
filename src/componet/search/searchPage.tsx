import { Box, Heading, Input, useBoolean, Button } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export const SearchPage: FC = () => {
    const queryString = window.location.search;
    const param = new URLSearchParams(queryString);

    const [query, setQuery] = useState<any | null>();
    const [flag, setFlag] = useBoolean();
    const navigate = useNavigate();

    useEffect(() => {
        setQuery(param.get('query'));
    }, []);

    return (
        <>
            <Box
                position="relative"
                color="white"
                w="100%"
                display="flex"
                flexDir="column"
                alignItems="center"
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
                        onClick={() => navigate('..')}
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
                <Box textAlign="start" w="90%" mt="3vw">
                    <Heading>Result Found: {query}</Heading>
                    <Box display="flex">
                        <Input
                            w="100%"
                            fontSize={['2vh', '2vh', '1vw', '1vw']}
                            color="white"
                            placeholder="Search for a movie, tv show, people and more ...."
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
                            onClick={() => navigate(`?query=${query}`)}
                        >
                            <BiSearch />
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
