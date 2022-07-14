import {
    FormControl,
    Input,
    Box,
    Heading,
    Button,
    Text,
    Alert,
    AlertDescription,
} from '@chakra-ui/react';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { NavBar } from './nav';

type Inputs = {
    Username: string;
    Email: string;
    isValid: boolean;
};

interface Props {
    getUser: getUser;
}

export const LoginForm: React.FC<Props> = (props) => {
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        props.getUser(data.Username, data.Email);
        navigate('../');
    };

    return (
        <>
            <NavBar />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    position="relative"
                    w="60vw"
                    h="80vh"
                    display="flex"
                    alignContent="center"
                    justifyContent="center"
                    flexDir="column"
                >
                    <Box
                        color="#fff"
                        textAlign="center"
                        w="100%"
                        display="flex"
                        flexDir="column"
                        gap={[3, 3, 5, 5]}
                    >
                        <Heading fontSize="5vw" fontWeight="semibold">
                            Movies, Tv, Show and more.
                        </Heading>
                        <Text
                            fontSize={['3vw', '3.3vw', '2.1vw', '1.8vw']}
                            fontWeight="medium"
                        >
                            Wacth everywhere, wacth everytime and enjoy
                        </Text>
                        <Text
                            fontSize={['2.2vw', '2.2vw', '1.8vw', '1.5vw']}
                            fontWeight="thin"
                            letterSpacing="0.2vw"
                        >
                            Ready to wacth? Enter username and email now and
                            enjoy the cinema
                        </Text>
                    </Box>
                    <FormControl
                        mt="3"
                        display="flex"
                        alignItems="center"
                        flexDir="column"
                        gap="5"
                    >
                        <Input
                            w={['100%', '75%', '65%', '60%']}
                            h={['4vh', '5vh', '5vh', '5vh']}
                            fontSize={['3vw', '3vw', '1.6vw', '1.3vw']}
                            backgroundColor="#fff"
                            placeholder="Username"
                            {...register('Username', {
                                required: true,
                            })}
                            borderEnd="1px"
                            borderColor="gray.200"
                            p={['0', '3', '5', '6']}
                        />
                        <Input
                            w={['100%', '75%', '65%', '60%']}
                            h={['4vh', '5vh', '5vh', '5vh']}
                            fontSize={['3vw', '3vw', '1.6vw', '1.3vw']}
                            backgroundColor="#fff"
                            placeholder="Email"
                            {...register('Email', {
                                required: true,
                            })}
                            borderEnd="1px"
                            borderColor="gray.200"
                            p={['0', '3', '5', '6']}
                        />
                        {errors.Username && (
                            <Alert
                                status="error"
                                alignItems="center"
                                justifyContent="center"
                                textAlign="center"
                                w={['80%', '80%', '50%', '50%']}
                                h={['10%', '20%', '80%', '100%']}
                                borderRadius="md"
                                fontSize={['2.4vw', '2.3vw', '1.5vw', '1vw']}
                            >
                                <AlertDescription>
                                    Username is Required
                                </AlertDescription>
                            </Alert>
                        )}
                        {errors.Email && (
                            <Alert
                                status="error"
                                alignItems="center"
                                justifyContent="center"
                                textAlign="center"
                                w={['80%', '80%', '50%', '50%']}
                                h={['10%', '20%', '80%', '100%']}
                                borderRadius="md"
                                fontSize={['2.4vw', '2.3vw', '1.5vw', '1vw']}
                            >
                                <AlertDescription>
                                    Email is Required
                                </AlertDescription>
                            </Alert>
                        )}
                        <Button
                            pe="3vw"
                            ps="3vw"
                            pb="1.6vw"
                            pt="1.6vw"
                            color="#fff"
                            fontWeight="bold"
                            type="submit"
                            colorScheme="red"
                            isLoading={isSubmitting}
                        >
                            Get Started
                        </Button>
                    </FormControl>
                </Box>
            </form>
        </>
    );
};
