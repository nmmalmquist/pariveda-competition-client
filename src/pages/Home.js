import { Container } from "react-bootstrap";

import styles from "../css/home-page.module.css";
import DogCollage from "../components/DogCollage";
import MyCarousel from "../components/MyCarousel";
import logo from "../assets/logo.png";

function Home() {

  const images = ["https://cdn.cnn.com/cnnnext/dam/assets/201030094143-stock-rhodesian-ridgeback-super-tease.jpg", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*","https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/20113314/Carolina-Dog-standing-outdoors.jpg","https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-1200x628-FACEBOOK-1200x628.jpg"]

  return (
    <div>
      <section className={styles.section}>
        <Container className={styles.pageContainer}>
          <div className={styles.titleLogoContainer}>
            <img className={styles.titleLogo} src={logo} alt="dog-logo" />
          </div>
          <DogCollage />
          <div className={styles.hrContainer}>
            <hr />
          </div>
        </Container>
      </section>
      <section className={styles.section}>
        <Container className={styles.pageContainer}>
          <div className={styles.containerFluid}>
            <h1 id="about">About</h1>
            <div className={styles.aboutContainer}>
              <p className={styles.aboutText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ultrices tincidunt arcu non sodales neque sodales ut etiam.
                Donec ac odio tempor orci dapibus ultrices in iaculis. Sit amet
                porttitor eget dolor morbi non. Commodo quis imperdiet massa
                tincidunt nunc pulvinar sapien et. Lectus quam id leo in vitae
                turpis massa. Consectetur adipiscing elit ut aliquam purus sit
                amet luctus. Odio euismod lacinia at quis risus sed vulputate
                odio. Faucibus et molestie ac feugiat sed lectus. Porttitor eget
                dolor morbi non arcu risus quis varius. Blandit aliquam etiam
                erat velit scelerisque in dictum non. Interdum consectetur
                libero id faucibus nisl tincidunt eget nullam. Leo duis ut diam
                quam.
              </p>
              <p className={styles.aboutText}>
                Eu volutpat odio facilisis mauris sit amet massa vitae. Eu
                facilisis sed odio morbi quis commodo odio. Habitant morbi
                tristique senectus et netus et malesuada. Dis parturient montes
                nascetur ridiculus. Euismod nisi porta lorem mollis aliquam.
                Fringilla urna porttitor rhoncus dolor. Et ligula ullamcorper
                malesuada proin libero nunc consequat. Fermentum iaculis eu non
                diam phasellus vestibulum lorem. Blandit turpis cursus in hac.
                Netus et malesuada fames ac turpis egestas integer eget. Nisl
                nisi scelerisque eu ultrices vitae. Eu feugiat pretium nibh
                ipsum consequat nisl vel. Et sollicitudin ac orci phasellus
                egestas tellus rutrum. At lectus urna duis convallis convallis
                tellus. At varius vel pharetra vel turpis nunc eget. Aliquet
                nibh praesent tristique magna sit amet. Sit amet aliquam id diam
                maecenas. Commodo elit at imperdiet dui
              </p>
            </div>
          </div>
        </Container>
        <div className={styles.titleCarousel}>
          <MyCarousel imageLinks={images}/>
        </div>
      </section>
    </div>
  );
}

export default Home;
