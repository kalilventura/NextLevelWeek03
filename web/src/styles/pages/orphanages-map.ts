import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    width: 100vw;

    position: relative;
    display: flex;

    .leaflet-container {
        z-index: 5;
    }

    .create-orphanages {
        position: absolute;
        right: 40px;
        bottom: 40px;

        z-index: 10;

        width: 64px;
        height: 64px;
        background: #15C3D6;
        border-radius: 20px;

        display: flex;
        justify-content: center;
        align-items: center;

        transition: background-color 0.2s;

        &:hover {
            background: #17D6ED;
        }
    }

    .map-popup .leaflet-popup-content-wrapper {
        background: rgba(255, 255, 255, 0.8);
        border-radius: 20px;
        box-shadow: none;
    }

    .map-popup .leaflet-popup-content {
        color: #0089A5;
        font-size: 20px;
        font-weight: bold;
        margin: 8px 12px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        a {
            width: 40px;
            height: 40px;
            background: #15C3D6;
            box-shadow: 17.2868px 27.6589px 41.4884px rgba(23, 142, 166, 0.16);
            border-radius: 12px;

            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .map-popup .leaflet-popup-tip-container {
        display: none;
    }
`;

export const ContentWrapper = styled.aside`
    width: 440px;
    background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);
    padding: 80px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    header {
        h2 {
            font-size: 40px;
            font-weight: 800;
            line-height: 42px;
            margin-top: 64px;
        }

        p {
            line-height: 28px;
            margin-top: 24px;
        }
    }

    footer {
        display: flex;
        flex-direction: column;
        line-height: 24px;

        strong {
            font-weight: 800;
        }
    }
`;