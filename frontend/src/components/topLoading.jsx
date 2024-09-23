import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const TopLoading = () => {
    const [progress, setProgress] = useState(0)
    const { pathname } = useLocation();

    useEffect(() => {
        setProgress(20)

        setTimeout(() => {
            setProgress(40)
        }, 100);

        setTimeout(() => {
            setProgress(70)
        }, 400);

        setTimeout(() => {
            setProgress(100)
        }, 1200);

    }, [pathname])

    useEffect(() => {
        setTimeout(() => {
            setProgress(0)
        }, 50);
    }, [])

    const color = 'linear-gradient(90deg, #f58529, #dd2a7b, #8134af, #515bd4)'
    return (
        <LoadingBar
            color={color}
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
        />
    )
}

export default TopLoading;