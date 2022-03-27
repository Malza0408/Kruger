import { Carousel, Image } from 'react-bootstrap';

const Advertisement = () => {
    return (
        <Carousel
            interval={2000}
            style={{ width: '20rem' }}
            className="mb-3 mx-auto"
        >
            <Carousel.Item>
                <Image
                    src={`${process.env.PUBLIC_URL}/img/main.png`}
                    width="100%"
                    height="200px"
                />
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    src={`${process.env.PUBLIC_URL}/img/advertisement1.png`}
                    width="100%"
                    height="200px"
                />
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    src={`${process.env.PUBLIC_URL}/img/advertisement2.png`}
                    width="100%"
                    height="200px"
                />
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    src={`${process.env.PUBLIC_URL}/img/advertisement3.png`}
                    width="100%"
                    height="200px"
                />
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    src={`${process.env.PUBLIC_URL}/img/advertisement4.png`}
                    width="100%"
                    height="200px"
                />
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    src={`${process.env.PUBLIC_URL}/img/advertisement5.png`}
                    width="100%"
                    height="200px"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default Advertisement;
