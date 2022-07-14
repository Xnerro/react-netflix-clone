import { Box, Container, SimpleGrid, Button, Heading } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../nav';

interface Props {
    user: User[];
}

export const HomePage: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <NavBar />
            <Box
                position="relative"
                w="100%"
                h="80vh"
                justifyContent="space-around"
                display="flex"
                alignItems="center"
                flexDir="column"
            >
                <Heading color="#fff" fontSize={['5vw', '4vw', '4vw', '3vw']}>
                    Choose A User
                </Heading>
                <Container
                    bg="blackAlpha.500"
                    h="70%"
                    w={['60%', '50%', '30%', '30%']}
                    textAlign="center"
                    color="#fff"
                    overflow="auto"
                >
                    <SimpleGrid
                        columns={2}
                        gap="5"
                        p={['0', '0', '3', '5']}
                        pt={['2', '2', '3', '5']}
                    >
                        {props.user.map((x, i) => (
                            <Container
                                key={i}
                                width={['22vw', '22vw', '11vw', '11vw']}
                                height={['22vw', '22vw', '11vw', '11vw']}
                                bgGradient={`linear(to-br, ${x.color.start} 15%, ${x.color.end})`}
                                boxShadow="inset 0 0 30px 5px rgba(0,0,0,0.3)"
                                borderRadius="md"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                cursor="pointer"
                                fontSize={['3vw', '3vw', '1.6vw', '1.3vw']}
                                _hover={{
                                    boxShadow:
                                        'inset 0 0 50px 10px rgba(0,0,0,0.5)',
                                }}
                                onClick={() => navigate('home')}
                            >
                                {x.username}
                            </Container>
                        ))}
                    </SimpleGrid>
                </Container>
                <Button
                    w="30%"
                    variant="solid"
                    colorScheme="red"
                    fontSize={['3vw', '3vw', '1.6vw', '1.3vw']}
                    onClick={() => {
                        navigate('register');
                    }}
                >
                    Tambah User
                </Button>
            </Box>
        </>
    );
};
