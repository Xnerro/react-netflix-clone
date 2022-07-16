import React, { useState } from 'react';
import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react';

import { LoginForm } from './componet/login';
import { MoviePage } from './componet/home/moviePage';
import { HomePage } from './componet/home/homePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fontsource/rubik';
import './style.css';
import { SearchPage } from './componet/search/searchPage';

const theme = extendTheme({
    fonts: {
        heading: `'rubik', sans-serif`,
        body: `'rubik', sans-serif`,
    },
});

const colorGr = [
    { start: 'red.400', end: 'red.700' },
    { start: 'facebook.400', end: 'facebook.700' },
    { start: 'teal.400', end: 'teal.700' },
    { start: 'purple.400', end: 'purple.700' },
    { start: 'green.400', end: 'green.700' },
    { start: 'pink.400', end: 'pink.700' },
];

const pengguna: User[] = [
    {
        username: 'bagus',
        email: 'bagus@email.com',
        color: {
            start: 'red.400',
            end: 'red.700',
        },
    },
];

export const App: React.FC = () => {
    const [user, setUser] = useState<User[]>(pengguna);

    const getUser: getUser = (data1: string, data2: string) => {
        var color = colorGr[Math.floor(Math.random() * colorGr.length)];
        setUser([
            ...user,
            {
                username: data1,
                email: data2,
                color: { ...color, start: color.start, end: color.end },
            },
        ]);
    };

    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Box
                    w="100%"
                    minH="100vh"
                    maxW="100%"
                    h="100%"
                    display="flex"
                    alignItems="center"
                    flexDir="column"
                    bg="black"
                >
                    <Box
                        position="absolute"
                        top="0%"
                        zIndex="0"
                        w="100%"
                        h="max"
                        minH="100vh"
                        justifyContent="center"
                        backgroundImage="https://images.unsplash.com/photo-1574267432644-f410f8ec2474?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                        backgroundSize="cover"
                        backgroundRepeat="no-repeat"
                        filter="auto"
                        brightness="60%"
                        display="inline"
                        boxShadow="inset 0px 0px 300px 20px rgba(0,0,0,1), inset -20px 0 2000px 20px black"
                    ></Box>
                    <Routes>
                        <Route
                            path="register"
                            element={<LoginForm getUser={getUser} />}
                        />
                        <Route path="" element={<HomePage user={user} />} />
                        <Route path="home" element={<MoviePage />} />
                        <Route path="home/search" element={<SearchPage />} />
                    </Routes>
                </Box>
            </Router>
        </ChakraProvider>
    );
};
