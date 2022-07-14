import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

export const NavBar: React.FC = () => {
    return (
        <Box
            w="100%"
            h="5vh"
            zIndex="100"
            position="relative"
            display="flex"
            alignItems="center"
            p="10"
            justifyContent={['center', 'center', 'inherit', 'inherit']}
        >
            <Heading color="#fff" letterSpacing="0.2vw">
                React Movie
            </Heading>
        </Box>
    );
};
