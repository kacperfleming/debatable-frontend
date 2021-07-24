import { useEffect, useState } from "react";

const useScrollMonitor = () => {
    const [toBottom, set]:any = useState(0);

    const listenScrolling = () => set(document.body.scrollHeight - document.documentElement.scrollTop);

    useEffect(() => {
        window.addEventListener('scroll', listenScrolling);

        return () => window.removeEventListener('scroll', listenScrolling);
    }, [])

    return toBottom;
}

export default useScrollMonitor;