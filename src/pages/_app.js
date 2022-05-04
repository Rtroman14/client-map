import { Wrapper, Status } from "@googlemaps/react-wrapper";
import "../../styles/globals.css";

const render = (status) => {
    switch (status) {
        case Status.LOADING:
            return "<Spinner />";
        case Status.FAILURE:
            return "<ErrorComponent />";
        case Status.SUCCESS:
            return "<MyMapComponent />";
    }
};

function MyApp({ Component, pageProps }) {
    return (
        <Wrapper apiKey={process.env.GOOGLE_MAPS_API_KEY} render={render}>
            <Component {...pageProps} />
        </Wrapper>
    );
}

export default MyApp;
