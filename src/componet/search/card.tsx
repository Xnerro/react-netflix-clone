import { Box, Image, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

interface Props {
    url: any;
}

export const Card: FC<Props> = (props) => {
    return (
        <>
            <Box
                w={['12vh', '12vh', '14vw', '14vw']}
                h="fit-content"
                boxShadow="0px 0px 5px 1px rgba(0,0,0,0.7)"
                bg="whiteAlpha.300"
                borderBottomRadius="5px"
            >
                <Image
                    h={['20vh', '20vh', '21vw', '21vw']}
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${props.url.poster}`}
                    alt={props.url.title}
                />
                <Box
                    padding={['0.2vh', '0.2vh', '0.5 vw', '0.5vw']}
                    display="flex"
                    flexDir={['column', 'column', 'column', 'row']}
                    justifyContent="space-between"
                    fontSize={['1.5vh', '1.5vh', '1.5vw', '1vw']}
                >
                    <Text
                        textOverflow="ellipsis"
                        whiteSpace={['nowrap', 'nowrap', 'nowrap', 'nowrap']}
                        overflow="hidden"
                    >
                        {props.url.title}
                    </Text>
                    <Text
                        flexBasis={['47.5%', '47.5%', '45%', '45%']}
                        textAlign={['start', 'start', 'start', 'end']}
                    >
                        {props.url.rate} ★
                    </Text>
                </Box>
            </Box>
        </>
    );
};
