import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Carousel from "./Carousel";

const BannerContent = styled("div")(({ theme }) => ({
  height: 400,
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around",
}));

const Tagline = styled("div")(({ theme }) => ({
  display: "flex",
  height: "40%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
}));

function Banner() {

  return (
      <Container>
        <BannerContent>
          <Tagline>
            <Typography
              variant="h3"
              style={{
                fontWeight: "bold",
                marginBottom: 15,
                fontFamily: "Montserrat",
              }}
            >
              Welcome to CoinView
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "Montserrat",
              }}
            >
              Get all the Info regarding your favorite Crypto Currency
            </Typography>
          </Tagline>
          <Carousel/>
        </BannerContent>
      </Container>
  );
}

export default Banner;
