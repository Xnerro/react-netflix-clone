type getUser = (data1, data2) => void;

interface User {
    username: string;
    email: string;
    color: {
        start: string;
        end: string;
    };
}
