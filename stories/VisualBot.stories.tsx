import * as React from "react";
import { VisualBot } from "../source/index";

const { useEffect, useState } = React;

const DEMO_CODE = "NAdtaLSe";

export default { title: "VisualBot" };

export const framed = () => <VisualBot code={DEMO_CODE} />;

export const seamless = () => <VisualBot code={DEMO_CODE} seamless />;

export const afterBeingUnmounted = () => {
    const [destroyed, setDestroyed] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (timeLeft === 0) {
                clearTimeout(timeout);
                setDestroyed(true);
                return;
            }
            setTimeLeft(Math.max(0, timeLeft - 1));
        }, 1000);
        return () => clearTimeout(timeout);
    }, [timeLeft]);
    return (
        <div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis feugiat
                nunc, eu venenatis purus imperdiet vitae. Nam quis eros non diam blandit dignissim
                id in quam. Nam sed nisi a nibh mattis lobortis ut vel turpis. Duis tristique
                sodales rhoncus. Morbi ligula elit, aliquam sit amet finibus ac, euismod ac nisi.
                Donec sagittis enim enim, a interdum lacus accumsan ac. Cras gravida enim eget
                facilisis varius. Integer at dui suscipit, pretium ligula non, vestibulum erat.
                Vivamus tempor consequat urna. Praesent luctus turpis eu orci aliquam, varius semper
                augue ornare. Praesent lacinia dictum felis, fermentum faucibus tortor efficitur
                quis. Nulla sit amet arcu ante. Aliquam dapibus eros at est mollis cursus. Donec sed
                libero feugiat, iaculis leo in, ornare ante. Nunc lectus magna, mollis sed vehicula
                ut, pulvinar vel est.
            </p>
            <div>
                {!destroyed && <VisualBot code={DEMO_CODE} />}
                {destroyed && <VisualBot code={DEMO_CODE} seamless />}
            </div>
            {!destroyed && <i>Time left before destruction: {timeLeft} seconds</i>}
            <p>
                Ut posuere rhoncus feugiat. Maecenas fringilla luctus nisl a euismod. Nam suscipit
                viverra turpis, eu molestie sapien fermentum id. Integer a laoreet nisi. Proin
                ornare, neque id condimentum sagittis, massa libero dictum enim, eu semper ipsum
                dolor sit amet nunc. Sed id auctor odio, sit amet viverra nunc. Proin nec metus at
                massa pretium tincidunt. In bibendum, risus eu interdum convallis, diam tellus
                sagittis ante, vel feugiat augue nunc nec purus. Integer et bibendum dolor.
                Phasellus faucibus a ipsum ut finibus. Sed ullamcorper risus sit amet posuere
                suscipit.
            </p>
        </div>
    );
};
