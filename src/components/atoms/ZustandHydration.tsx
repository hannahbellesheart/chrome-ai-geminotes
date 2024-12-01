import { useEffect, useState, PropsWithChildren } from 'react';

const ZustandHydration = ({ children }: PropsWithChildren) => {
    const [isHydrated, setIsHydrated] = useState<boolean>(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return <>{isHydrated ? children : null}</>;
};

export default ZustandHydration;
